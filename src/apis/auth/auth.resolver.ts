import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserService } from '../users/user.service';
import { UnprocessableEntityException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';
@Resolver()
export class AuthResolver {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}
  @Mutation(() => String)
  async login(
    @Args('email') email: string, //
    @Args('password') password: string,
  ) {
    // 1. 로그인 (이메일과 비밀번호가 일치하는 유저 찾기)
    const user = await this.userService.findOne({ email });
    // 1-1 일치하는 유저가 없으면 에러 던지기.
    if (!user) {
      throw new UnprocessableEntityException('이메일이 없습니다.');
    }
    // 1-2 password 확인
    const isAuth = await bcrypt.compare(password, user.password);
    if (!isAuth) {
      throw new UnprocessableEntityException('password가 틀렸습니다.');
    }
    // 2. 일치하는 유저가 있으면 accessToken을 만들어 브라우저에 전달.
    return this.authService.getAccessToken({ user });
  }
}
