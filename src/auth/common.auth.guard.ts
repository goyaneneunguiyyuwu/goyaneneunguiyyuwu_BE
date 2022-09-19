import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
@Injectable()
export class CommonAuthGuard extends AuthGuard(['local', 'kakao']) {
  async canActivate(context: ExecutionContext) {
    await super.canActivate(context);
    const request = context.switchToHttp().getRequest();
    await super.logIn(request);
    return true;
  }
}
