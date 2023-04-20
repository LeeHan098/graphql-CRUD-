import { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

export class GqlAuthAccessGuard extends AuthGuard('myGuard') {
  //gql에서 사용하기 위해 req를 오버라이딩한다.
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}
