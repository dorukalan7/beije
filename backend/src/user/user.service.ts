import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { randomBytes } from 'crypto';
import * as nodemailer from 'nodemailer';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // Kullanıcı oluştur ve verification token üret
  async register(username: string, email: string): Promise<User> {
    const verificationToken = randomBytes(16).toString('hex');

    const user = this.userRepository.create({
      username,
      email,
      verificationToken,
      isVerified: false,
    });

    const savedUser = await this.userRepository.save(user);

    // Email gönder
    await this.sendVerificationEmail(email, username, verificationToken);

    return savedUser;
  }

  // Email doğrulama
  async verifyEmail(username: string, token: string): Promise<string> {
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) throw new NotFoundException('User not found');
    if (user.verificationToken !== token) throw new BadRequestException('Invalid token');

    user.isVerified = true;
    await this.userRepository.save(user);

    return 'Email verified successfully';
  }

  // Kullanıcı doğrulamasını kontrol et
  async checkVerification(username: string): Promise<string> {
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) throw new NotFoundException('User not found');

    return user.isVerified ? 'User is verified' : 'User is not verified';
  }

  // 🔹 Email gönderim fonksiyonu
  private async sendVerificationEmail(email: string, username: string, token: string) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'seninemail@gmail.com',  
        pass: 'app_password',          
      },
    });

    const url = `http://localhost:3000/user/verify-email/${username}/${token}`;

    await transporter.sendMail({
      from: '"Beije" <seninemail@gmail.com>',
      to: email,
      subject: 'Email Verification',
      html: `Merhaba ${username},<br><br> Hesabını doğrulamak için linke tıkla: <a href="${url}">Doğrula</a>`,
    });
  }
}
