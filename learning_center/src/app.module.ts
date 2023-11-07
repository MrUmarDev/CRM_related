import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { RegionModule } from './region/region.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'path';
import { DistrictModule } from './district/district.module';
import { UserModule } from './user/user.module';
import { CreditCardModule } from './credit_card/credit_card.module';
import { UserAddressModule } from './user_address/user_address.module';
import { AuthorModule } from './author/author.module';
import { PostsModule } from './posts/posts.module';
import { CategoryModule } from './category/category.module';
import { ArticleModule } from './article/article.module';
import { NewsModule } from './news/news.module';
import { TestModule } from './test/test.module';
import { AnswerModule } from './answer/answer.module';
import { ExercisesModule } from './exercises/exercises.module';
import { CourseModule } from './course/course.module';
import { StatusModule } from './status/status.module';
import { CartModule } from './cart/cart.module';
import { PaymentMethodModule } from './payment_method/payment_method.module';
import { DiscountCouponIdModule } from './discount_coupon_id/discount_coupon_id.module';
import { BookingModule } from './booking/booking.module';
import { FilesModule } from './files/files.module';
import { MediaModule } from './media/media.module';
import { UserOpinionModule } from './user_opinion/user_opinion.module';
import { AdminModule } from './admin/admin.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { TelegrafModule } from 'nestjs-telegraf';
import { TelegramBotModule } from './telegram-bot/telegram-bot.module';
import { MyBotName } from './app.constants';
import {Admin} from "./admin/entity/admin.entity";
import {Answer} from "./answer/entity/answer.entity";
import {Article} from "./article/entity/article.entity";
import {Author} from "./author/entity/author.entity";
import {Booking} from "./booking/entity/booking.entity";
import {Cart} from "./cart/entity/cart.entity";
import {Category} from "./category/entity/category.entity";
import {Course} from "./course/entity/course.entity";
import {CreditCard} from "./credit_card/entity/credit-card.entity";
import {Coupon} from "./discount_coupon_id/entity/coupon.entity";
import {District} from "./district/entity/district.entity";
import {Exercises} from "./exercises/entity/exercise.entity";
import {Media} from "./media/entity/media.entity";
import {News} from "./news/entity/news.entity";
import {PaymentMethod} from "./payment_method/entity/payment-method.entity";
import {Posts} from "./posts/entity/posts.entity";
import {Region} from "./region/entity/region.entity";
import {Status} from "./status/entity/status.entity";
import {Test} from "./test/entity/test.entity";
import {User} from "./user/entity/user.entity";
import {UserAddress} from "./user_address/entity/address.entity";
import {Opinion} from "./user_opinion/entity/opinion.entity";
import {MailModule} from "./email/email.module";

@Module({
  imports: [
    // Read environment variables
    ConfigModule.forRoot({
      envFilePath: `.env`,
      isGlobal: true,
    }),

    // Send Email -------------------------------------
    MailerModule.forRoot({
      transport: {
        host: process.env.SMTP_HOST,
        port: +process.env.SMTP_PORT,
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      },
      defaults: {
        from: process.env.SMTP_USER,
      },
    }),

    // Telegram Bot
    TelegrafModule.forRootAsync({
      botName: MyBotName,
      useFactory: () => ({
        token: process.env.TELEGRAM_BOT_TOKEN,
        middlewares: [],
        include: [TelegramBotModule],
      }),
    }),
    TelegramBotModule,

    // Static Folder
    ServeStaticModule.forRoot({
      rootPath: resolve(__dirname, 'static'),
    }),

    // Connect to PostgreSQL database
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: String(process.env.POSTGRES_PASSWORD),
      database: process.env.POSTGRES_DB,
      models: [
          Admin,
          Answer,
          Article,
          Author,
          Booking,
          Cart,
          Category,
          Course,
          CreditCard,
          Coupon,
          District,
          Exercises,
          Media,
          News,
          PaymentMethod,
          Posts,
          Region,
          Status,
          Test,
          User,
          UserAddress,
          Opinion,
      ],
      autoLoadModels: true,
      logging: false,
    }),

    // Custom modules
    RegionModule,
    DistrictModule,
    UserModule,
    CreditCardModule,
    UserAddressModule,
    AuthorModule,
    PostsModule,
    CategoryModule,
    ArticleModule,
    NewsModule,
    TestModule,
    AnswerModule,
    ExercisesModule,
    CourseModule,
    StatusModule,
    CartModule,
    PaymentMethodModule,
    DiscountCouponIdModule,
    BookingModule,
    FilesModule,
    MediaModule,
    UserOpinionModule,
    AdminModule,
    MailModule,
    TelegramBotModule,
  ],
})
export class AppModule {}
