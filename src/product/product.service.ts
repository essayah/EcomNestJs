import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entity/product.entity';
import { Repository } from 'typeorm';
import { ProductDTO } from 'src/entitiesDTO/product.dto';

@Injectable()
export class ProductService {

    constructor(@InjectRepository(Product) private productRepository: Repository<Product>) { }

    async   showAllProducts() {
        return await this.productRepository.find();
    }

    async findProductById(id: number) {
        return await this.productRepository.findOne({ where: { id } });
    }

    async createNewProduct(data : ProductDTO) {
        const product = await this.productRepository.create(data);
        await this.productRepository.save(product);
        return product;
    }

    async updateProduct(id:number, data : Partial<ProductDTO>){
        await this.productRepository.update({id}, data); 
        return this.findProductById(id); 
    }

    async deleteProduct(id:number){
        await this.productRepository.delete(id);
        return {deleted : true}; 

    }

}
