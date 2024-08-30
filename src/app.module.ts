import {
  BadRequestException,
  Module,
  ValidationError,
  ValidationPipe,
} from "@nestjs/common";
import { DatabaseModule } from "./database/database.module";
import { ConfigModule } from "@nestjs/config";
import { UsersModule } from "./users/users.module";
import { APP_PIPE } from "@nestjs/core";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    UsersModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
        exceptionFactory: (errors: ValidationError[]) => {
          const formattedError = errors.map((error: ValidationError) => ({
            field: error.property,
            issues: Object.values(error.constraints),
          }));
          return new BadRequestException({
            message: formattedError,
            errors: formattedError,
          });
        },
      }),
    },
  ],
})
export class AppModule {}
