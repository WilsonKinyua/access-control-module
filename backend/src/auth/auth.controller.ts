import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  // Login a user
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto): Promise<{ access_token: string } | { error: string }> {
    try {
      const user = await this.authService.validateUser(loginUserDto.email, loginUserDto.password);      
      if (!user) {
        throw new HttpException('Invalid email or password provided!', HttpStatus.UNAUTHORIZED);
      }      
      return this.authService.login(user);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  // Register a new user
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto): Promise<User> {
    try {
      return await this.authService.register(createUserDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}