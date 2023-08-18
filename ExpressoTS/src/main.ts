import "reflect-metadata";

import { App } from "@providers/application/application.provider";
import { container } from "app.container";
import { ServerEnvironment } from "@expressots/core";
import ENV from "./env";
import { MongoDB } from "@providers/db/db.provider";

async function bootstrap() {
    const app = App.create(container);
    await MongoDB.connectMongoDB();

    app.listen(
        ENV.Application.PORT,
        ServerEnvironment[ENV.Application.ENVIRONMENT],
        {
            appName: ENV.Application.APP_NAME,
            appVersion: ENV.Application.APP_VERSION,
        },
    );
}

bootstrap();
