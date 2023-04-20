import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entites/user.entity';
import { JwtAccessStrategy } from 'src/commons/auth/jwt-access.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    JwtAccessStrategy,
    UserResolver, //
    UserService,
  ],
})
export class UserModule {}
