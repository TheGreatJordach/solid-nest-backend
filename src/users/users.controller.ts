import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Controller("users")
export class UsersController {
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return `This Handler create with data ${createUserDto} and return a user`;
  }

  @Patch("id")
  update(@Param("id") id: string, @Body() UpdateUserDto: UpdateUserDto) {
    return `This Handler update the user with id ${id} with data ${UpdateUserDto} and return updated user`;
  }

  @Get()
  getUser() {
    return "This Handler return all users";
  }

  @Get(":id")
  getUserById(@Param("id") id: string) {
    return "This Handler return a user with id " + id;
  }

  @Delete(":id")
  delete(@Param("id") id: string) {
    return "This Handler delete  and return a user with id " + id;
  }
}
