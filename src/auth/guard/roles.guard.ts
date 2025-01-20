import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());

    console.log('Entro a verificar ROLES')

    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    console.log('User role: ' + user.role.name);

    if (!user || !user.role) {
      console.error('User or role not defined.');
      return false;
    }

    return requiredRoles.includes(user.role.name); // 'user.role.name' es el nombre del rol del usuario
  }
}
