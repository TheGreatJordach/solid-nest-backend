import {
  IsEmail,
  IsPhoneNumber,
  IsStrongPassword,
  Length,
} from "class-validator";

export class CreateUserDto {
  @Length(3, 23)
  readonly name: string;
  @IsEmail()
  readonly email: string;
  @IsStrongPassword()
  readonly password: string;
  @IsPhoneNumber()
  readonly phone: string;
}
