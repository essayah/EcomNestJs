import { Controller, Get, Put, Post, Delete, Param, Body } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDTO } from 'src/entitiesDTO/product.dto';

@Controller('product')
export class ProductController {

    constructor(private productService: ProductService) { }

    @Get()
    showAllProducts() {
        return this.productService.showAllProducts();
    }

    @Get(':id')
    findProductById(@Param('id') id: number) {
        return this.findProductById(id);
    }

    @Put(':id')
    updateProduct(@Param('id') id: number, @Body() data: Partial<ProductDTO>) {
        return this.productService.updateProduct(id, data);
    }

    @Post()
    creatProduct(@Body() data: ProductDTO) {
        return this.productService.createNewProduct(data);
    }

    @Delete(':id')
    deleteProduct(@Param('id') id: number) {
        return this.productService.deleteProduct(id);
    }

}
