import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class JwtAccessStrategy extends PassportStrategy(
  // 무엇을 인증 할지
  Strategy,
  'myGuard',
) {
  constructor() {
    // PassportStrategy를 상속받아 사용
    super({
      //header에 있는 authorization에서 jwt를 뽑아서 PassportStrategy에게 보냄
      //ExtractJwt가 header에 있는 Bearer을 때에내준다.
      //PassportStrategy에서 실패하면 에러를 보냄
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'studySecret',
    });
  }
  //PassportStrategy가 인가 성공 했을 때 실행할 함수
  validate(payload) {
    console.log(payload);
    return {
      email: payload.email,
      id: payload.sub,
    };
  }
}
