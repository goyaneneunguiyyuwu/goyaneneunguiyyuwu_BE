import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
@Injectable()
export class LocalAuthGuard extends AuthGuard(['local', 'kakao']) {
  async canActivate(context: ExecutionContext) {
    try {
      await super.canActivate(context);
      const request = context.switchToHttp().getRequest();
      await super.logIn(request);
      return true;
    } catch (err) {
      console.log(err);
    }
  }
}
