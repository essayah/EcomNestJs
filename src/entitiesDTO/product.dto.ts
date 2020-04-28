import { Category } from "src/entity/category.entity";

export interface ProductDTO{

    name : string;
    description : string; 
    price : number; 
    crearedAt : Date;
    category : Category

}