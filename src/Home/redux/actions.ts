import { createAction } from "@reduxjs/toolkit";
import { Category, Product } from "../../common/store/types";

export const fetchCategoriesAction = createAction("src/Home/redux/actions/fetchCategoriesAction");

export const storeCategoriesAction = createAction<Category[]>("src/Home/redux/actions/storeCategoriesAction");

export interface FetchProductsByCategoryAction {
    categoryId: number
}
export const fetchProductsByCategoryAction = createAction<FetchProductsByCategoryAction>("src/Home/redux/actions/fetchProductsByCategoryAction");

export interface StoreProductsByCategoryAction {
    categoryId: number
    products: Product[]
}

export const storeProductsByCategoryAction = createAction<StoreProductsByCategoryAction>("src/Home/redux/actions/storeProductsByCategoryAction");
