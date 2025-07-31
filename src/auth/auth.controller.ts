import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dtos/sign-in.dto';
import { Auth } from './decorator/auth.decorator';
import { AuthType } from './enums/auth-type.enum';

@Auth(AuthType.None)
@Controller('api/auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  // by default @Post does 201, so we use @HttpCode to change it to 200
  @HttpCode(HttpStatus.OK)
  @Post()
  signIn(@Body() signInDto: SignInDto) {
    return this.service.signIn(signInDto);
  }
}
