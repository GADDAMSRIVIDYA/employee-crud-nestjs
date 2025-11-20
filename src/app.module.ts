import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import mongoose from 'mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeesModule } from './employees/employees.module';
import { SkillsModule } from './skills/skills.module';
import { AuthModule } from './auth/auth.module';

import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-guards';
import { RolesGuard } from './auth/guards/roles.guard';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const uri = configService.get<string>('MONGO_URI');
        console.log(' Connecting to MongoDB with URI:', uri);

        mongoose.connection.on('connected', () => {
          console.log('💚 MongoDB Connected Successfully!');
        });

        mongoose.connection.on('error', (err) => {
          console.log('❌ MongoDB Connection Error:', err);
        });

        return { uri };
      },
    }),

  
    // DatabaseModule,

    EmployeesModule,
    SkillsModule,
    AuthModule,
  ],

  controllers: [AppController],

  providers: [
    AppService,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
})
export class AppModule {}
