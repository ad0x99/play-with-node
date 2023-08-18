import { AuthRepository } from "@repositories/authentication/auth.repository";
import { provide } from "inversify-binding-decorators";
import { ISignInUserRequestDTO, ISignInUserResponseDTO } from "./sign-in.dto";

@provide(SignInUserCase)
class SignInUserCase {
    constructor(private authRepository: AuthRepository) {}

    async signIn(
        payload: ISignInUserRequestDTO,
    ): Promise<ISignInUserResponseDTO | null> {
        try {
            const { email, password } = payload;

            const userExists = await this.authRepository.findOne({ email });

            if (!userExists || userExists.password !== password) {
                throw new Error(
                    `Email or password are incorrect, please try again`,
                );
            }

            return {
                name: userExists.name,
                email: userExists.email,
            };
        } catch (error) {
            throw error;
        }
    }
}

export { SignInUserCase };
