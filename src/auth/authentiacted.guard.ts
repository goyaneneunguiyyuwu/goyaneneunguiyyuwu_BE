import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const isAuthenticated = request.isAuthenticated();
    if (isAuthenticated === false)
      throw new UnauthorizedException('유저 인증에 실패했습니다.');
    return isAuthenticated;
  }
}
