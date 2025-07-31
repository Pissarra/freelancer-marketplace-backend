import { Module } from '@nestjs/common';import { TypeOrmModule } from '@nestjs/typeorm';
import { HashService } from './hash.service';
import { User } from '../common/entities/user.entity';
import { Permission } from '../common/entities/permission.entity';
import { BcryptService } from './bcrypt.service';
import { AuthController } from './auth.controller';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from './guards/jwt.guard';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from '../config/jwt.config';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from './auth.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Permission]),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: HashService,
      useClass: BcryptService,
    },
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
    JwtGuard,
  ],
})
export class AuthModule {}
