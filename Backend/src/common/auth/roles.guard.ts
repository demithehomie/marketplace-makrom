import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { map } from "rxjs";
import { Roles } from "../enum/roles.enum";
import { Permissions } from "../enum/permissions.enum";

@Injectable()
export class RolesGuard implements CanActivate{
    
    constructor(private readonly reflector: Reflector){}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const roles = this.reflector.get<Roles[]>('roles', context.getHandler());
        if (!roles) {
            return true;
        }
        
        const request = context.switchToHttp().getRequest();
        const user = request.user;

        if (user && user.roles){
            return user.roles.some((role) => roles.includes(role));
        }
        return false;
    }

    handlerRequest(err, user, info) {
        if (err || !user) {
            throw err || new Error('Usuário não autorizado');
        }
        return user;
    }

}
