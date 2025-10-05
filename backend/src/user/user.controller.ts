import { Controller, Post, Get, Body, Param, BadRequestException, NotFoundException, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { MailService } from './mail.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly mailService: MailService,
  ) {}

  @Post('register')
  async register(@Body() body: { username: string; email: string }) {
    if (!body.username || !body.email) {
      throw new BadRequestException('username ve email gerekli');
    }

    const verificationToken = Math.random().toString(36).substring(2, 15);

    // Aynı username var mı kontrol et
    const existingUser = await this.userRepository.findOne({
      where: { username: body.username },
    });
    if (existingUser) {
      throw new BadRequestException('Bu kullanıcı adı zaten kullanılıyor');
    }

    // Aynı email var mı kontrol et
    const existingEmail = await this.userRepository.findOne({
      where: { email: body.email },
    });
    if (existingEmail) {
      throw new BadRequestException('Bu email zaten kayıtlı');
    }

    // DB kaydı oluştur
    const user = await this.userRepository.save({
      username: body.username,
      email: body.email,
      verificationToken,
      isVerified: false,
    });

    // Email gönder
    await this.mailService.sendVerificationEmail(body.email, verificationToken);

    return { message: 'User registered successfully', user };
  }

  @Get('verify-email/:username/:verificationToken')
  async verifyEmail(
    @Param('username') username: string,
    @Param('verificationToken') token: string,
  ) {
    // Kullanıcıyı bul
    const user = await this.userRepository.findOne({
      where: { username },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Token kontrolü
    if (user.verificationToken !== token) {
      throw new BadRequestException('Invalid token');
    }

    // Kullanıcıyı verified yaptık
    user.isVerified = true;
    await this.userRepository.save(user);

    return { message: 'User verified successfully' };
  }
  @Get('check-verification')
async checkVerification(@Query('username') username: string, @Query('email') email: string) {
  const user = await this.userRepository.findOne({ where: { username, email } });

  if (!user) {
    throw new NotFoundException('Kullanıcı bulunamadı veya email yanlış');
  }

  if (!user.isVerified) {
    throw new BadRequestException('Email doğrulanmamış');
  }

  return { message: 'User is verified' };
}



}
