import { BaseController, StatusCode } from "@expressots/core";
import {
    controller,
    httpPost,
    requestBody,
    response,
} from "inversify-express-utils";
import { SignInUserCase } from "./sign-in.usecase";
import { ISignInUserRequestDTO, ISignInUserResponseDTO } from "./sign-in.dto";

@controller("/sign-in")
class SignInController extends BaseController {
    constructor(private signInUserCase: SignInUserCase) {
        super("sign-in-controller");
    }

    @httpPost("/")
    signIn(
        @requestBody() payload: ISignInUserRequestDTO,
        @response() res: Response,
    ): Promise<ISignInUserResponseDTO | void> {
        return this.callUseCaseAsync(
            this.signInUserCase.signIn(payload),
            res,
            StatusCode.OK,
        );
    }
}

export { SignInController };
