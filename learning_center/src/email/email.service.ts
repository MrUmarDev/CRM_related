import { Injectable } from '@nestjs/common';
import { Admin } from '../admin/entity/admin.entity';
import { MailerService } from '@nestjs-modules/mailer';
import {User} from "../user/entity/user.entity";

const { env } = process;

@Injectable()
export class MailService {
  constructor(private mailService: MailerService) {}

  sendAdminConfirmation = async (admin: Admin): Promise<void> => {
    const activation_url = `${env.API_HOST}/api/admin/activate/${admin.activation_link}`;
    console.log(activation_url);
    await this.mailService.sendMail({
      to: admin.email,
      subject: "This is from Learning Center. Welcome! Please confirm your email",
      template: './confirmation',
      context: {
        name: admin.firstname,
        url: activation_url,
      },
    });
  };

  sendUserConfirmation = async (user: User): Promise<void> => {
    const activation_url = `${env.API_HOST}/api/customer/activate/${user.email}`;
    console.log(activation_url);
    await this.mailService.sendMail({
      to: user.email,
      subject: "This is from Learning Center. Welcome! Please confirm your email",
      template: './confirmation',
      context: {
        name: user.firstname,
        url: activation_url,
      },
    });
  };
}
