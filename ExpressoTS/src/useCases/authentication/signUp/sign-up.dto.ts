import { IsEmail, IsNotEmpty, IsString } from "class-validator";

class SignUpDTO {
    @IsNotEmpty()
    @IsEmail()
    email!: string;

    @IsNotEmpty()
    @IsString()
    name!: string;

    @IsNotEmpty()
    password!: string;
}

interface ISignUpUserRequestDTO {
    email: string;
    name: string;
    password: string;
}

interface ISignUpUserResponseDTO {
    email: string;
    name: string;
}

export { SignUpDTO, ISignUpUserRequestDTO, ISignUpUserResponseDTO };
