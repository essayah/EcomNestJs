import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "src/shared/entity/category.entity";
import { Repository } from "typeorm";

@Injectable()
export class CategoryRepository {
/*
    constructor(
        @InjectRepository(Category)
        protected repository : Repository<Category>
    ){ }

    async findOne(id:number) : Promise<Category>{
        return await this.repository.findOne(id);
    }*/
}