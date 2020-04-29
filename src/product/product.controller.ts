import { Controller, Get, Put, Post, Delete, Param, Body } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDTO } from 'src/shared/entitiesDTO/product.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('product')
export class ProductController {

    constructor(private productService: ProductService) { }

    @ApiOperation({
        description: 'la liste de tous les produits'
    })
    @Get()
    showAllProducts() {
        return this.productService.showAllProducts();
    }

    @ApiOperation({
        description : 'Selectionne un produit par id'
    })
    @Get('/product/:id')
    findProductById(@Param('id') id: number) {
        return this.productService.findProductById(id);
    }

    @ApiOperation({
        description : 'Modification de produit par ID'
    })
    @Put(':id')
    updateProduct(@Param('id') id: number, @Body() data: Partial<ProductDTO>) {
        return this.productService.updateProduct(id, data);
    }

    @ApiOperation({
        description : 'Ajout Produit par ID'
    })
    @Post()
    creatProduct(@Body() data: ProductDTO) {
        return this.productService.createNewProduct(data);
    }

    @ApiOperation({
        description : 'Supprission produit par ID'
    })
    @Delete(':id')
    deleteProduct(@Param('id') id: number) {
        return this.productService.deleteProduct(id);
    }

    @ApiOperation({
        description : 'la liste de produits par Mots clé'
    })
    @Get('/search/:mc')
    getProductsByMC(@Param('mc') mc: string){
        return this.productService.getProductByKW(mc);
    }

}
