
import { Injectable, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { EmployeesService } from '../employees/employees.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly employeesService: EmployeesService,
    private readonly jwtService: JwtService,
  ) {}

 
  async validateCredentials(email: string, password: string) {
  const employee = await this.employeesService.findByEmail(email);
  if (!employee) {
    throw new UnauthorizedException('Invalid credentials');
  }

  const passwordMatches = await bcrypt.compare(password, employee.password); 
  if (!passwordMatches) {
    throw new UnauthorizedException('Invalid credentials');
  }

  return employee;
}

async login(email: string, password: string) {
  const employee = await this.validateCredentials(email, password);
  const payload = { sub: employee._id.toString(), email: employee.email, role: employee.role ,empNumber: employee.empNumber};
  console.log("🔥 JWT PAYLOAD",payload);
  return {
    access_token: this.jwtService.sign(payload),
  };
}

  async verifyToken(token: string) {
    try {
      const decoded = this.jwtService.verify(token); 
      return decoded;
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  
}
