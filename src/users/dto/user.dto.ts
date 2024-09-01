import { Expose } from "class-transformer";

export class UserDto {
  @Expose()
  readonly id: number;
  @Expose()
  readonly email: string;
  @Expose()
  readonly phone: number;
}
