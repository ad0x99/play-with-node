import { Report, provideSingleton } from "@expressots/core";
import { ModelType } from "@typegoose/typegoose/lib/types";
import { ObjectId } from "mongoose";

@provideSingleton(BaseRepository)
export class BaseRepository<T> {
    protected resources!: ModelType<T>;
    private report!: Report;

    getResource() {
        return this.resources;
    }

    async getById(_id: ObjectId, project: string[] = []) {
        return this.resources.findById(_id).select(project);
    }

    async findOne(condition: any, project: string[] = []) {
        const resource = await this.resources
            .findOne(condition)
            .select(project);

        if (!resource) {
            this.report.error(
                "Resource not found",
                404,
                this.getResource().toString(),
            );
        }

        return resource;
    }

    async getOne(condition: any = {}, project: string[] = []) {
        return this.resources.findOne(condition).select(project);
    }

    async create(data: Partial<T>) {
        return this.resources.create(data);
    }
}
