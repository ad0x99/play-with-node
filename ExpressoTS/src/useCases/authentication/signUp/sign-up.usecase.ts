import { AuthRepository } from "@repositories/authentication/auth.repository";
import { provide } from "inversify-binding-decorators";
import { ISignUpUserRequestDTO } from "./sign-up.dto";
import { Report } from "@expressots/core";
import { Auth } from "@entities/auth.entity";

@provide(SignUpUserCase)
class SignUpUserCase {
    constructor(private authRepository: AuthRepository) {}

    async signUp(payload: ISignUpUserRequestDTO): Promise<Auth | void> {
        try {
            const { email } = payload;
            const userExists = await this.authRepository.getOne({ email });

            if (userExists) {
                Report.Error(`User with email ${email} already exists`);
            }

            const newUser = await this.authRepository.signUp(payload);
            return newUser;
        } catch (error) {
            throw error;
        }
    }
}

export { SignUpUserCase };
