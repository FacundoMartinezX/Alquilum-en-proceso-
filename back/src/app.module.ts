import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReserveModule } from './reserve/reserve.module';
import { SpaceWorkModule } from './space-work/space-work.module';
import { PaymentsModule } from './payments/payments.module';
import { AuthModule } from './auth/auth.module';
import { ReviewsModule } from './reviews/reviews.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm';
import { DisponibilityModule } from './disponibility/disponibility.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }), 
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: typeOrmConfig
    }),
    UsersModule, ReserveModule, SpaceWorkModule, PaymentsModule, AuthModule, ReviewsModule, DisponibilityModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}