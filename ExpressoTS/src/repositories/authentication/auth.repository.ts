import { Auth, AuthModel } from "@entities/auth.entity";
import { BaseRepository } from "@repositories/base/base.repository";
import { provide } from "inversify-binding-decorators";

@provide(AuthRepository)
class AuthRepository extends BaseRepository<Auth> {
    constructor() {
        super();
        this.resources = AuthModel;
    }

    async signUp(auth: Auth): Promise<Auth | void> {
        return this.create(auth);
    }
}

export { AuthRepository };
