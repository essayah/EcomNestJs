import { Injectable, NotFoundException } from '@nestjs/common';
import { Category } from 'src/shared/entity/category.entity';
import { CategoryDTO } from 'src/shared/entitiesDTO/category.dto';
import { CreateOrUpdateCategoryDTO } from 'src/shared/entitiesDTO/create-update-category.dto';
import { CategorySerializer } from 'src/shared/serializers/category.serializer';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductSerializer } from 'src/shared/serializers/product.serialiser';

@Injectable()
export class CategoryService {

  constructor(@InjectRepository(Category)
  private categoryRepository: Repository<Category>) { }

  async showAllCategories(): Promise<CategoryDTO[]> {
    let categories = await this.categoryRepository.find();
    return CategorySerializer.fromEntities(categories);
  }

  async findOne(id: number): Promise<CategoryDTO> {
    return CategorySerializer.fromEntity(await this.categoryRepository.findOne(id));
  }

  async createCategory(createOrUpdateCategoryDTO: CreateOrUpdateCategoryDTO): Promise<CategoryDTO> {

    let category = new Category();
    category.description = createOrUpdateCategoryDTO.description;

    category = await this.categoryRepository.save(category);
    return CategorySerializer.fromEntity(category);
  }

  async getCategoryById(id: number): Promise<CategoryDTO> {
    const category = await this.categoryRepository.findOne(id);

    if (!category) {
      throw new NotFoundException('Aucune Category Trouvée');
    }
    return CategorySerializer.fromEntity(category);
  }

  async updateCategory(id: number, data: Partial<CategoryDTO>) {
    await this.categoryRepository.update({ id }, data);
    return await this.categoryRepository.findOne({ where: { id } });
  }

  async deleteCategory(id: number) : Promise<void> {
    const obj = await this.categoryRepository.findOne({ id });
    if(!obj){
      throw new NotFoundException('Aucune catégorie trouvée');
    }
    return await this.categoryRepository.delete(id).then(result => {deleted : true});

  }
}
