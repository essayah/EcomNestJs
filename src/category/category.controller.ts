import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDTO } from 'src/entitiesDTO/category.dto';

@Controller('category')
export class CategoryController {

    constructor(private categoryService: CategoryService) { }

    @Get()
    showAllCategories() {
        return this.categoryService.showAllCategories();
    }

    @Post()
    createCategory(@Body() data: CategoryDTO) {
        return this.categoryService.createCategory(data);
    }

    @Get(':id')
    getCategoryById(@Param('id') id: number) {

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
