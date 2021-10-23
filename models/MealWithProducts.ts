import { Meal } from "./Meal";
import { Product } from "./Product";

export interface MealWithProducts {
    meal: Meal,
    products: Product[]
};