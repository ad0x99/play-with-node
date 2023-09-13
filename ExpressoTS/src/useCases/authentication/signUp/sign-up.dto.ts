import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

class SignUpDTO {
    @IsNotEmpty()
    @IsEmail()
    email!: string;

    @IsNotEmpty()
    @IsString()
    name!: string;

    @IsNotEmpty()
    @Length(10)
    password!: string;
}

interface ISignUpUserResponseDTO {
    email: string;
    name: string;
}

export { SignUpDTO, ISignUpUserResponseDTO };
