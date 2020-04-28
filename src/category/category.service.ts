import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Category } from 'src/entity/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryDTO } from 'src/entitiesDTO/category.dto';

@Injectable()
export class CategoryService {

    constructor(
        @InjectRepository(Category)
        private categoryRepository : Repository<Category>
    ) { }

    async showAllCategories() {
        return await this.categoryRepository.find();
    }

    async createCategory(data : CategoryDTO) {
        const category = await this.categoryRepository.create(data);
        await this.categoryRepository.save(category);
        return category;
    }

    async getCategoryById(id: number) {
        return await this.categoryRepository.findOne({ where: { id } });
    }

    async updateCategory(id: number, data : Partial<CategoryDTO>) {
        await this.categoryRepository.update({ id }, data);
        return await this.categoryRepository.findOne({ where: { id } });
    }

    async deleteCategory(id: number) {
        await this.categoryRepository.delete({ id });
        return { deleted: true };

    }
}
