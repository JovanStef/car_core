
import { Injectable, NestInterceptor, ExecutionContext, CallHandler, BadRequestException } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ResponseUserDto } from '../dto/response-user.dto';
import { ResponseProfileDto } from 'src/profiles/dto/response-profile.dto';

@Injectable()
export class UsersInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const http = context.switchToHttp();
    const request = http.getRequest();
    const params = request.params;

    return next
      .handle()
      .pipe(
        map((val)=>{
          const response = val.map((user) => {
            user.profile = new ResponseProfileDto(user.profile) 
            return new ResponseUserDto(user)
          })
          return params?.id ? response[0] || {} : response
        }),
        catchError((error)=>{
            if(error?.driverError?.code === 'SQLITE_CONSTRAINT'){
                return of(new BadRequestException('User Already Exists'))
            }
            return of(error)
        })
      );
  }
}