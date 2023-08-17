import { BaseController, StatusCode } from "@expressots/core";
import {
    controller,
    httpPost,
    requestBody,
    response,
} from "inversify-express-utils";
import { SignUpUserCase } from "./sign-up.usecase";
import { ISignUpUserRequestDTO, SignUpDTO } from "./sign-up.dto";
import { DTOValidatorMiddleware } from "validation/DTOValidatorMiddleware";
import { Auth } from "@entities/auth.entity";

@controller("/sign-up")
class SignUpController extends BaseController {
    constructor(private signUpUserCase: SignUpUserCase) {
        super("sign-up-controller");
    }

    @httpPost("/", DTOValidatorMiddleware(SignUpDTO))
    async signIn(
        @requestBody()
        payload: ISignUpUserRequestDTO,
        @response() res: any,
    ): Promise<Auth | void> {
        return this.callUseCaseAsync(
            this.signUpUserCase.signUp(payload),
            res,
            StatusCode.Created,
        );
    }
}

export { SignUpController };
