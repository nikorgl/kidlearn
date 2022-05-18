import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthMiddleware } from './user/middlewares/auth.middlware';
import ormconfig from './ormconfig';
import { UserModule } from './user/user.module';

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forRoot(ormconfig), UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
