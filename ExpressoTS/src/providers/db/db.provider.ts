import { Report, provideSingleton } from "@expressots/core";
import { mongoose } from "@typegoose/typegoose";
import { ConnectOptions } from "mongoose";

@provideSingleton(MongoDB)
class MongoDB {
    private report!: Report;

    /**
     * The function connects to a MongoDB database using the provided environment variables.
     */
    public async connectMongoDB() {
        const connection = `${process.env.DB_PROTOCOL}://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}${process.env.DB_PORT}/${process.env.DB_NAME}`;

        try {
            const conn = await mongoose.connect(connection, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            } as ConnectOptions);

            console.group([
                `DB Connection URL: ${
                    process.env.ENVIRONMENT === "Development"
                        ? connection
                        : "null"
                }`,
                `Connected to ${conn.connection.db.databaseName} database!`,
            ]);
        } catch (error: any) {
            console.group([
                `DB Connection FAILED: ${
                    process.env.ENVIRONMENT === "Development"
                        ? connection
                        : "null"
                }`,
            ]);
            this.report.error(error.message, undefined, "MongoDB");
        }
    }
}

const mongoInstance = new MongoDB();

export { mongoInstance as MongoDB };
