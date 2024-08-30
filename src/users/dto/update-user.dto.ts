import {
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsStrongPassword,
  Length,
} from "class-validator";

export class UpdateUserDto {
  @IsOptional()
  @Length(3, 25)
  readonly name: string;
  @IsOptional()
  @IsEmail()
  readonly email: string;
  @IsOptional()
  @IsStrongPassword()
  readonly password: string;
  @IsOptional()
  @IsPhoneNumber("MA")
  readonly phone: string;
}
