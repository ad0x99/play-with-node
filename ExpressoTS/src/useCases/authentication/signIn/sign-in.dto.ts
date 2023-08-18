interface ISignInUserRequestDTO {
    email: string;
    password: string;
}

interface ISignInUserResponseDTO {
    email: string;
    name: string;
}

export { ISignInUserRequestDTO, ISignInUserResponseDTO };
