import { CreateModule } from "@expressots/core";
import { SignInController } from "./signIn/sign-in.controller";
import { SignUpController } from "./signUp/sign-up.controller";

const AuthenticationModule = CreateModule([SignUpController, SignInController]);

export { AuthenticationModule };
