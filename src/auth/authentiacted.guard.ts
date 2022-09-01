import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    try {
      const request = context.switchToHttp().getRequest();
      console.log(request.isAuthenticated());
      return request.isAuthenticated();
    } catch (err) {
      console.log(err);
    }
  }
}
