import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDTO } from 'src/shared/entitiesDTO/category.dto';
import { CreateOrUpdateCategoryDTO } from 'src/shared/entitiesDTO/create-update-category.dto';

@Controller('category')
export class CategoryController {

    constructor(public categoryService: CategoryService) { }

    @Get()
    showAllCategories(){
       return this.categoryService.showAllCategories();
    }


    @Post()
   async createCategory(@Body() data: CreateOrUpdateCategoryDTO): Promise <CategoryDTO> {
        return await this.categoryService.createCategory(data);
    }

    @Get(':id')
    getCategoryById(@Param('id') id: number) : Promise <CategoryDTO> {

        return this.categoryService.getCategoryById(id);
    }


    @Put(':id')
    updateCategory(@Param('id') id: number, @Body() data: Partial<CategoryDTO>) {
         return this.categoryService.updateCategory(id, data);
    }

    @Delete(':id')
    deleteCategory(@Param('id') id: number) {
       return this.categoryService.deleteCategory(id);
    }

}
