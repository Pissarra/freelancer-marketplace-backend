import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtUserData } from '../interfaces/user.interface';
import { REQUEST_USER_KEY } from '../../config/constants';

export const ActiveUser = createParamDecorator(
  (field: keyof JwtUserData | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user: JwtUserData | undefined = request[REQUEST_USER_KEY];
    return field ? user?.[field] : user;
  },
);