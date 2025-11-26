import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/http-exception-filter';
import { JwtAuthGuard } from './auth/guards/jwt-guards';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  //app.useGlobalGuards(app.get(JwtAuthGuard));
  const config = new DocumentBuilder()
    .setTitle('Employee & Skills API')
    .setDescription('API for managing employees and skills')
    .setVersion('1.0')
    .addBearerAuth()      
    .addTag('employees')    
    .addTag('skills')       
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);

  console.log('🚀 Server running on http://localhost:3000');
  console.log('📖 Swagger docs at http://localhost:3000/api');
}
bootstrap();
