import { AuthRepository } from "@repositories/authentication/auth.repository";
import { provide } from "inversify-binding-decorators";
import { ISignUpUserResponseDTO, SignUpDTO } from "./sign-up.dto";
import { Report } from "@expressots/core";
import { AuthUtils } from "utils/auth.utils";

@provide(SignUpUserCase)
class SignUpUserCase {
    constructor(
        private authRepository: AuthRepository,
        private report: Report,
        private authUtils: AuthUtils,
    ) {}

    async signUp(payload: SignUpDTO): Promise<ISignUpUserResponseDTO | void> {
        try {
            const { email, password, name } = payload;
            const userExists = await this.authRepository.getOne({ email });

            if (userExists) {
                throw this.report.error(
                    `User with email ${email} already exists`,
                );
            }

            const newUser = await this.authRepository.signUp({
                email,
                name,
                password: await this.authUtils.hashPassword(password),
            });
            return newUser;
        } catch (error) {
            throw error;
        }
    }
}

export { SignUpUserCase };
