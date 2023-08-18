import { provide } from "inversify-binding-decorators";
import { getModelForClass, prop } from "@typegoose/typegoose";

@provide(Auth)
export class Auth {
    @prop({ required: true })
    public name!: string;

    @prop({ required: true })
    public email!: string;

    @prop({ required: true })
    public password!: string;
}

export const AuthModel = getModelForClass(Auth);
