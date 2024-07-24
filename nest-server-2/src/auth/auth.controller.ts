import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthEntity } from './entity/auth.entity';
import { SigninDto } from './dto/signin.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiOkResponse({ type: AuthEntity })
  signup(@Body() { username, password }: SigninDto) {
    return this.authService.signup(username, password);
  }

  @Post('signin')
  @ApiOkResponse({ type: AuthEntity })
  signin(@Body() signinDto: SigninDto) {
    return this.authService.signin(signinDto);
  }
}
