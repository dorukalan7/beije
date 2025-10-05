import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'dorukalan7@gmail.com',  
        pass: 'qtki gmav zecr yvzo',     
      },
    });
  }

  async sendVerificationEmail(email: string, token: string) {
    const mailOptions = {
      from: 'dorukalan7@gmail.com',    
      to: email,
      subject: 'Email Doğrulama',
      text: `Doğrulama için bu tokeni kullan: ${token}`,
    };
    await this.transporter.sendMail(mailOptions);
  }
}
