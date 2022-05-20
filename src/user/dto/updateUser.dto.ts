import { IsEmail, IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
  readonly name: string;

  @IsEmail()
  readonly email: string;

  readonly password: string;
}
