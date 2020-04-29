import { Category } from "src/shared/entity/category.entity";
import { CategoryDTO } from "./category.dto";

export class ProductDTO{
    id : number;
    name : string;
    description : string; 
    price : number; 
    crearedAt : Date;
    category?: CategoryDTO;
}