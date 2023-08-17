import { AppContainer } from "@expressots/core";
import { AuthenticationModule } from "@useCases/authentication/auth.module";

const appContainer = new AppContainer();

const container = appContainer.create([AuthenticationModule]);

export { container };
