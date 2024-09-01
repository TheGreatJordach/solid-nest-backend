import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UsersService } from "./users.service";
import { IdDto } from "../common/id-dto";
import { Serialize } from "../interceptors/serializer.interceptor";
import { UserDto } from "./dto/user.dto";
import { AuthService } from "./auth.service";

@Serialize(UserDto)
@Controller("users")
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Get("/")
  async findOne(@Query("email") email: string) {
    console.log(`try to find ${email}`);
    return this.usersService.find(email);
  }

  @Get("/ids")
  getAllUsersIds() {
    return this.usersService.returnAllUsersIds();
  }

  @Get("/:id")
  getUserById(@Param() { id }: IdDto) {
    return this.usersService.getUserByID(id);
  }

  @Post("/signup")
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.signup(createUserDto);
    // return this.usersService.create(createUserDto);
  }

  @Post("/signing")
  signing(@Body() createUserDto: CreateUserDto) {
    return this.authService.signing(createUserDto);
    // return this.usersService.create(createUserDto);
  }

  @Patch("/:id")
  update(@Param() { id }: IdDto, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Get()
  getUsers() {
    return this.usersService.getAllUsers();
  }

  @Delete("/:id")
  delete(@Param() { id }: IdDto) {
    return this.usersService.delete(id);
  }
}
