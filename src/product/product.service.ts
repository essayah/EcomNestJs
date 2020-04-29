import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/shared/entity/product.entity';
import { Repository, Like } from 'typeorm';
import { ProductDTO } from 'src/shared/entitiesDTO/product.dto';
import { ProductSerializer } from 'src/shared/serializers/product.serialiser';
import { CategorySerializer } from 'src/shared/serializers/category.serializer';

@Injectable()
export class ProductService {

    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>) { }

    async   showAllProducts(): Promise<ProductDTO[]>{
        const products =  await this.productRepository.find();
        return ProductSerializer.fromEntities(products);
        
    }

    async findProductById(id: number): Promise<ProductDTO> {
        const product = await this.productRepository.findOne({ where: { id } });
        return ProductSerializer.fromEntity(product);
    }

    async createNewProduct(data: ProductDTO) : Promise<ProductDTO> {
        const product = await this.productRepository.create(data);
        await this.productRepository.save(product);
        return ProductSerializer.fromEntity(product);
    }

    async updateProduct(id: number, data: Partial<ProductDTO>) : Promise<ProductDTO> {
        await this.productRepository.update({ id }, data);
        return this.findProductById(id);
    }

    async getProductByKW(kw : string) : Promise<ProductDTO[]>{
        let products = await this.productRepository.find({
            where : "Product.name LIKE '%"+ kw +"%' OR Product.description LIKE '%"+ kw +"%'"
        });
        return ProductSerializer.fromEntities(products);
    }

    async deleteProduct(id: number): Promise<void> {
        const obj = this.productRepository.findOne(id); 

        if(!obj){
            throw new NotFoundException("Pas de produit trouvé avec ce clé"); 
        }

        return await this.productRepository.delete(id).then(result => { deleted : true});
    }

}
