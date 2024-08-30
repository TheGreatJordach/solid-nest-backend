import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LogsOptions } from "./logOption";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        type: "postgres",
        host: configService.getOrThrow<string>("DATASOURCE_HOST"),
        database: configService.getOrThrow<string>("DATASOURCE_DATABASE"),
        port: configService.getOrThrow<number>("DATASOURCE_PORT"),
        username: configService.getOrThrow<string>("DATASOURCE_USERNAME"),
        password: configService.getOrThrow<string>("DATASOURCE_PASSWORD"),
        entities: [],
        synchronize: configService.getOrThrow<boolean>(
          "DATASOURCE_ENTITIES_SYNC",
        ),
        logNotifications: true,
        logging: true,
        loggingOptions: LogsOptions,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
