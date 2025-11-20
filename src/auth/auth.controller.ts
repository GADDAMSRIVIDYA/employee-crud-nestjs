import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorators';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Public()
  @Post('login')
  login(@Body() body: { email: string; password: string }) {
    //console.log("🔥 LOGIN HIT", body);
    return this.authService.login(body.email, body.password);
  }
}
