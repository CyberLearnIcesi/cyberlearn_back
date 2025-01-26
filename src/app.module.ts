import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';  // Modulo de autenticación
import { UserModule } from './user/user.module';  // Modulo de usuarios
import { ClassModule } from './course/course.module'; // Modulo de cursos
import { ActivityModule } from './activity/activity.module';  // Modulo de actividades
import { TopicModule } from './topic/topic.module';  // Modulo de temas
import { RoleModule } from './role/role.module';  // Modulo de roles
import { PermissionModule } from './permission/permission.module';  // Modulo de permisos
import { ConfigModule } from '@nestjs/config';  // Configuración global
import { TypeOrmModule } from '@nestjs/typeorm';  // Conexion a base de datos
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/guard/auth.guard';  // Guard de autenticación
import { DataInitService } from './init/data-init.service';
import { LevelModule } from './level/level.module';
import { ClassGroupModule } from './class_group/class_group.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // Conexión a la base de datos
    TypeOrmModule.forRoot({
      type: 'postgres', 
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      migrations: ["dist/migrations/*{.ts,.js}"],
      synchronize: true,  // En prod false
      autoLoadEntities: true,
      logging: true,  // Habilitado para ver las consultas SQL
    }),

    AuthModule,
    UserModule,
    ClassModule,
    ActivityModule,
    TopicModule,
    RoleModule,
    PermissionModule,
    LevelModule,
    ClassGroupModule,
  ],
  controllers: [AppController],
  providers: [
    DataInitService,
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,  // Guard global para proteger las rutas
    },
  ],
})
export class AppModule {}
