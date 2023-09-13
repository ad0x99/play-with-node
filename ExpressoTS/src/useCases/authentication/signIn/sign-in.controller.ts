import { BaseController, StatusCode, ValidateDTO } from "@expressots/core";
import {
    controller,
    httpPost,
    requestBody,
    response,
} from "inversify-express-utils";
import { SignInUserCase } from "./sign-in.usecase";
import { SignInDTO } from "./sign-in.dto";

@controller("/sign-in")
class SignInController extends BaseController {
    constructor(private signInUserCase: SignInUserCase) {
        super("sign-in-controller");
    }

    @httpPost("/", ValidateDTO(SignInDTO))
    signIn(
        @requestBody() payload: SignInDTO,
        @response() res: Response,
    ): Promise<SignInDTO | void> {
        return this.callUseCaseAsync(
            this.signInUserCase.signIn(payload),
            res,
            StatusCode.OK,
        );
    }
}

export { SignInController };
