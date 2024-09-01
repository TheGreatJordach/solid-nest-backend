import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  UseInterceptors,
} from "@nestjs/common";
import { map, Observable } from "rxjs";
import { ClassConstructor, plainToInstance } from "class-transformer";

export function Serialize<T>(dto: ClassConstructor<T>) {
  return UseInterceptors(new CustomSerializerInterceptor(dto));
  /**
   * @ClassConstructor<T> : The dto parameter is typed as ClassConstructor<T>, ensuring it
   * must be a class constructor. This enforces that only valid DTO classes can be passed
   * **/
}

export class CustomSerializerInterceptor<T> implements NestInterceptor {
  constructor(private dto: ClassConstructor<T>) {}
  /**
   *  @dto : Instead of user a hard coded UserDto, with this setup we can pass any
   *  king of dto based on the situation.
   */

  intercept(context: ExecutionContext, handler: CallHandler): Observable<T> {
    /**
     *  @Reminder : Write at this level the code that should run before request is handle by request handler (controller)
     */

    return handler.handle().pipe(
      map((data) => {
        /** @data : represent the incoming User Entity Instance, so that where were going to write the serialization logic.
            @Reminder : In this bloc of code we run something before the response is sent to user
         **/
        return plainToInstance(this.dto, data, {
          excludeExtraneousValues: true,
        });
        /**
         * @plainToInsace : The methode converter data to UserDto. data being incoming User Instance
         * @plainToClass : DEPRECIATED METHOD
         * @excludeExtraneousValues: This property read the this.dto and make sure ONLY field with @Expose()
         * decorator are shared. If you do not use this property, nothing will work.
         *
         * **/
      }),
    );
  }
}
