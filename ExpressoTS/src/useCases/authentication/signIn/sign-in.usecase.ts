import { AuthRepository } from "@repositories/authentication/auth.repository";
import { provide } from "inversify-binding-decorators";
import { ISignInUserResponseDTO, SignInDTO } from "./sign-in.dto";
import { Report } from "@expressots/core";
import { AuthUtils } from "utils/auth.utils";

@provide(SignInUserCase)
class SignInUserCase {
    constructor(
        private authRepository: AuthRepository,
        private report: Report,
        private authUtils: AuthUtils,
    ) {}

    async signIn(payload: SignInDTO): Promise<ISignInUserResponseDTO | null> {
        try {
            const { email, password } = payload;

            const userExists = await this.authRepository.findOne({ email });

            if (
                !userExists ||
                !(await this.authUtils.isValidPassword(password, userExists))
            ) {
                throw this.report.error(
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
