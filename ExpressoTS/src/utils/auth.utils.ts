import { provide } from "inversify-binding-decorators";
import { Report } from "@expressots/core";
import bcrypt from "bcryptjs";
import { SignOptions, sign, verify } from "jsonwebtoken";
import { Auth } from "@entities/auth.entity";

@provide(AuthUtils)
class AuthUtils {
    constructor(private report: Report) {}

    async hashPassword(password: string) {
        const salt = await bcrypt.genSalt(+process.env.SALT_NUMBER!);
        const hashedPassword = bcrypt.hash(password, salt);
        return hashedPassword;
    }

    async isValidPassword(password: string, currentUser: Auth) {
        const isValidPassword = await bcrypt.compare(
            password,
            currentUser.password,
        );

        if (!isValidPassword) {
            throw this.report.error(
                "Your email or password is not correct, please try again!",
            );
        }

        return isValidPassword;
    }

    tokenGenerator(args, options?: SignOptions): string {
        const token: string = sign(
            args,
            process.env.SECRET_TOKEN as string,
            options,
        );
        return token;
    }

    verifyToken(token: string) {
        if (!token) {
            throw this.report.error("Invalid Token");
        }

        const verifiedToken = verify(token, process.env.SECRET_TOKEN as string);
        return verifiedToken;
    }
}

export { AuthUtils };
