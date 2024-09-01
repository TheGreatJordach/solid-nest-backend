import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entity/user-entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const newUser = this.usersRepository.create(createUserDto);
      return await this.usersRepository.save(newUser);
    } catch (error) {
      throw new BadRequestException(error.detail);
    }
  }

  /**
   * Asynchronously updates a user with the given ID using the provided update data.
   *
   * @param {number} id - The ID of the user to be updated.
   * @param {UpdateUserDto} updateUserDto - The data transfer object containing the updated user information.
   * @returns {Promise<User>} - A promise that resolves to the updated user object.
   *
   * @throws {NotFoundException} - If no user with the given ID is found.
   * @throws {InternalServerErrorException} - If there is an error during the update process.
   *
   * @example
   * // Assuming you have an instance of the service and a valid user ID and update data
   * const userId = 1;
   * const updateData = { name: 'John Doe', email: 'john.doe@example.com' };
   *
   * try {
   *   const updatedUser = await userService.update(userId, updateData);
   *   console.log('User updated successfully:', updatedUser);
   * } catch (error) {
   *   console.error('Error updating user:', error);
   * }
   */
  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    // Step 1: Find User by ID and update data
    const updatedUser = await this.usersRepository.preload({
      id,
      ...updateUserDto,
    });

    // Step 2: Return an error if the ID is not found
    if (!updatedUser) {
      throw new NotFoundException(`user with id ${id} Not Found`);
    }

    // Step 3: Save the updated user and handle errors
    try {
      return await this.usersRepository.save(updatedUser);
    } catch (error) {
      // Log the error for further analysis
      // this.logger.error(`Failed to update user with ID ${id}`, error.stack);

      // Generic error message
      throw new InternalServerErrorException(
        `Failed to update user. error code ${error.code}`,
        error.detail.message,
      );
    }
  }

  /**
   * Asynchronously retrieves all users from the users repository.
   *
   * @returns {Promise<User[]>} A promise that resolves to an array of User objects.
   *
   * @throws {InternalServerErrorException} If there is an error while fetching users from the repository.
   * The error message includes the error code and detailed message.
   *
   * @example
   * // Example usage:
   * getAllUsers()
   *   .then(users => {
   *     console.log(users);
   *   })
   *   .catch(error => {
   *     console.error(error);
   *   });
   */
  async getAllUsers(): Promise<User[]> {
    try {
      return await this.usersRepository.find();
    } catch (error) {
      // Generic error message
      throw new InternalServerErrorException(
        `Failed to finds any user. error code ${error.code}`,
        error.detail.message,
      );
    }
  }

  /**
   * Asynchronously retrieves a user by their ID from the users repository.
   *
   * @param {number} id - The ID of the user to retrieve.
   * @returns {Promise<User>} A promise that resolves to the user object if found.
   *
   * @throws {NotFoundException} If no user with the given ID is found.
   *
   * @example
   * // Example usage:
   * const userId = 1;
   *
   * try {
   *   const user = await userService.getUserByID(userId);
   *   console.log('User retrieved successfully:', user);
   * } catch (error) {
   *   console.error('Error retrieving user:', error);
   * }
   */
  async getUserByID(id: number): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`No User with id :${id} Found`);
    }
    return user;
  }

  async delete(id: number): Promise<void> {
    const user = await this.getUserByID(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} Not Found`);
    } else {
      await this.usersRepository.delete(id);
    }
  }

  async returnAllUsersIds() {
    try {
      // Select only the "id" field to optimize performance
      const users = await this.usersRepository.find({ select: ["id"] });

      // Map and return IDS directly
      return users.map((user) => user.id);
    } catch (error) {
      // Log the full error for debugging, but return a generic error message to the client
      throw new InternalServerErrorException(
        "An unexpected error occurred while retrieving user IDs.",
      );
    }
  }

  async find(email: string): Promise<User> {
    console.log(`Service try to find ${email}`);
    return await this.usersRepository.findOne({ where: { email } });
    /**
     * @return : null if user not found
     * **/
  }
}
