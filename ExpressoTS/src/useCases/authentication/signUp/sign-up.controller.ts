import { BaseController, StatusCode, ValidateDTO } from "@expressots/core";
import {
    controller,
    httpPost,
    requestBody,
    response,
} from "inversify-express-utils";
import { SignUpUserCase } from "./sign-up.usecase";
import { ISignUpUserResponseDTO, SignUpDTO } from "./sign-up.dto";

@controller("/sign-up")
class SignUpController extends BaseController {
    constructor(private signUpUserCase: SignUpUserCase) {
        super("sign-up-controller");
    }

    @httpPost("/", ValidateDTO(SignUpDTO))
    async signIn(
        @requestBody()
        payload: SignUpDTO,
        @response() res: any,
    ): Promise<ISignUpUserResponseDTO | void> {
        return this.callUseCaseAsync(
            this.signUpUserCase.signUp(payload),
            res,
            StatusCode.Created,
        );
    }
}

export { SignUpController };
