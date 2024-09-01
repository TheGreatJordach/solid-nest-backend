import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UsersService } from "./users.service";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./entity/user-entity";

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}
  /**
   * @userService : Need for all the CRUD Ops + database connection
   **/

  async signup(createUserDto: CreateUserDto) {
    /**
     * @Step1: See if this email already is use.
     * @If-email-in-use : return an error
     * **/

    const { email, password } = createUserDto;

    const user = await this.usersService.find(email);
    if (user) {
      throw new HttpException("Email in use", HttpStatus.BAD_REQUEST);
      //Alternative throw new BadRequestException("Email already exists")
    } else {
      /**********************************************************
       * HASHING THE PASSWORD (process)
       * @Step1 : Generate a salt
       * @Step2 : Hash the salt and the password together
       * @Step3 : join the hashed result and the sal together
       * @Step4 : create a new user and save it
       * @Step5 : return the user
       *********************************************************
       * **/

      //@Step1: Generate a salt
      const salt = randomBytes(16).toString("hex");

      //@Step2 : Hash the salt and the password together
      const hash: Buffer = (await scrypt(password, salt, 32)) as Buffer;

      //@Step3 : join the hashed result and the sal together
      //const result = salt + "." + hash.toString("hex");
      const hashedPassword = `${salt}.${hash.toString("hex")}`;
      /**
       * name,email,phone,
       * **/
      //@Step4: Create a new user and save it + @Step5: Return the user
      return await this.usersService.create({
        ...createUserDto,
        password: hashedPassword,
      });
    }
  }

  /**********************************************************
   * SIGNING UP (process)
   * @Step1 : Search for the user | if not found throw an exception
   * @Step2 : get back (separate) the salt and the hash
   * @Step3 : hash the supplied password
   * @Step4 : compare the two hash (storedHash and calculated hash | if not the same -> Bad Password
   * @Step5 : return the user
   *********************************************************
   * **/
  async signing(signingUser: CreateUserDto): Promise<User> {
    const { email, password } = signingUser;

    const user = await this.usersService.find(email);
    if (!user) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    } else {
      //@Step2 : get back (separate) the salt and the hash
      const [salt, storedHash] = user.password.split(".");

      //@Step3 : hash the supplied password
      const hash: Buffer = (await scrypt(password, salt, 32)) as Buffer;

      //@Step4 : compare the two hash (storedHash and calculated hash | if not the same -> Bad Password
      if (storedHash !== hash.toString("hex")) {
        throw new HttpException("Invalid Password", HttpStatus.BAD_REQUEST);
      }
      return user;
    }
  }
}
