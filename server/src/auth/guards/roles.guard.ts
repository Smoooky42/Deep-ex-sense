import {
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException
} from "@nestjs/common";
import {Observable} from "rxjs";
import {JwtService} from "@nestjs/jwt";
import {Reflector} from "@nestjs/core";
import {ROLES_KEY} from "../decorators/roles-auth.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
                // private jwtService: JwtService,
                private reflector: Reflector) {
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        try {
            const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
                context.getHandler(),
                context.getClass(),
            ])
            if (!requiredRoles) {
                return true;
            }
            const req = context.switchToHttp().getRequest(); //В @Auth() guard уже есть расшифрофка токена и помощение в request
            // const authHeader = req.headers.authorization;
            // const bearer = authHeader.split(' ')[0]
            // const token = authHeader.split(' ')[1]
            //
            // if (bearer !== 'Bearer' || !token) {
            //     throw new UnauthorizedException({message: 'Пользователь не авторизован'})
            // }
            //
            // const user = this.jwtService.verify(token);
            // req.user = user;
            const user = req.user
            return user.roles.some(role => requiredRoles.includes(role.value));
        } catch (e) {
            console.log(e)
            throw new HttpException( 'Нет доступа', HttpStatus.FORBIDDEN)
        }
    }
}
