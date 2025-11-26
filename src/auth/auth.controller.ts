// import { Controller, Post, Body } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { Public } from './decorators/public.decorators';

// @Controller('auth')
// export class AuthController {
//   constructor(private readonly authService: AuthService) {}
//   @Public()
//   @Post('login')
//   login(@Body() body: { email: string; password: string }) {
//     //console.log("🔥 LOGIN HIT", body);
//     return this.authService.login(body.email, body.password);
//   }
// }



import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorators';
import { LoginDto } from './dto/login.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @ApiOperation({ summary: 'Login user and get JWT token' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 201, description: 'User logged in successfully' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  login(@Body() body: LoginDto) {
    return this.authService.login(body.email, body.password);
  }
}
