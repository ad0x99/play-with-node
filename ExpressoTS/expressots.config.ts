import { ExpressoConfig, Pattern } from "@expressots/core";

const config: ExpressoConfig = {
    sourceRoot: "src",
    scaffoldPattern: Pattern.KEBAB_CASE,
    opinionated: true,
    providers: {
        prisma: {
            schemaName: "expressots-auth",
            schemaPath: "string",
            entitiesPath: "string",
            entityNamePattern: "string",
        },
    },
};

export default config;
