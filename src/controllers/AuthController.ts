import {
  JsonController,
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
  NotFoundError,
  BadRequestError,
  Controller,
  Authorized,
  CurrentUser,
} from "routing-controllers";
import { User } from "../entities/User";
import jwt from "jsonwebtoken";
import dataSource from "../lib/DataSource";
import { IsEmail, IsString, IsStrongPassword } from "class-validator";
import bcrypt from "bcrypt";
import { authenticateViaJWT } from "../utils/auth";

class LoginRequestBody {
  @IsEmail({}, { message: "Please provide a valid email" })
  email: string;
  @IsString({ message: "Please provide a password" })
  password: string;
}

class RegisterRequestBody {
  @IsString({ message: "Please provide a name" })
  name: string;
  @IsEmail({}, { message: "Please provide a valid email" })
  email: string;
  @IsString({ message: "Please provide a password" })
  password: string;
}

@JsonController()
export class AuthController {
  private userRepository = dataSource.getRepository(User);

  @Get("/me")
  @Authorized()
  getAll(@CurrentUser() user: User) {
    return user;
  }
  @Post("/auth/login")
  async postLogin(@Body() auth: LoginRequestBody) {
    // Try finding the user with the given email address
    const user = await this.userRepository.findOne({
      where: { email: auth.email },
    });
    if (!user) {
      throw new NotFoundError(`User with given email address was not found.`);
    }

    // Validate the password if the user was found
    const isPasswordValid = await bcrypt.compare(auth.password, user.password);
    if (!isPasswordValid) {
      throw new NotFoundError(
        `User with given email and  password was not found`
      );
    }

    // Authenticate the user and return a JWT
    const token = authenticateViaJWT(user);

    return token;
  }

  @Post("/auth/register")
  async postRegister(@Body() auth: RegisterRequestBody) {
    // Try finding the user with the given email address
    const existingUser = await this.userRepository.findOne({
      where: { email: auth.email },
    });
    if (existingUser) {
      throw new BadRequestError(
        `User with given email address was already registered.`
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(
      auth.password,
      Number(process.env.SALT_ROUNDS) || 10
    );

    // Create the user\
    const user = await this.userRepository.save({
      name: auth.name,
      email: auth.email,
      password: hashedPassword,
      roles: ["USER"],
    });

    // Authenticate the user and return a JWT
    const token = authenticateViaJWT(user);

    return token;
  }
}
