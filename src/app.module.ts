import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { LoginModule } from './login/login.module';
import { AuthMiddleware } from './auth/auth.middleware';
import { VideoModule } from './video/video.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ChattModule } from './chatt/chatt.module';
import { ConfigModule } from '@nestjs/config';
import { CaptureModule } from './capture/capture.module';
import { NotificationModule } from './notification/notification.module';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/pregnancy'),
    UserModule,
    LoginModule,
    VideoModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/public'
    }),
    ChattModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    CaptureModule,
    NotificationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

// export class AppModule { }
export class AppModule implements AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).exclude({
      path: '/login',
      method: RequestMethod.POST
    }, {
      path: '/public/(.*)',
      method: RequestMethod.GET
    }).forRoutes('*')
  }
}
