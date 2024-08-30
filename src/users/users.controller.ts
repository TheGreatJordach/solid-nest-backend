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
import { UsersService } from "./users.service";
import { IdDto } from "../common/id-dto";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get("/ids")
  getAllUsersIds() {
    return this.usersService.returnAllUsersIds();
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Patch("/:id")
  update(@Param() { id }: IdDto, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Get()
  getUsers() {
    return this.usersService.getAllUsers();
  }

  @Get("/:id")
  getUserById(@Param() { id }: IdDto) {
    return this.usersService.getUserByID(id);
  }

  @Delete("/:id")
  delete(@Param() { id }: IdDto) {
    return this.usersService.delete(id);
  }
}
