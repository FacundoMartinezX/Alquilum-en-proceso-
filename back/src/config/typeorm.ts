import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export const typeOrmConfig = async (
  configService: ConfigService,
): Promise<TypeOrmModuleOptions> => ({
  type: 'postgres',
  host: configService.get('DB_HOST') || 'localhost',
  port: +configService.get('DB_PORT') || 5432,
  username: configService.get('DB_USERNAME') || '',
  password: configService.get('DB_PASSWORD') || '',
  database: configService.get('DB_NAME') || '',
  logging: false,
  entities: ['dist/**/*.entity{.ts,.js}'],
//   migrations: ['dist/migrations/*{.ts,.js}'],
  synchronize: true,
  dropSchema: false,
});
