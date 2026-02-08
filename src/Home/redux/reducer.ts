import { createReducer } from "@reduxjs/toolkit"
import { StoreProductsByCategoryAction, storeCategoriesAction, storeProductsAction, storeProductsByCategoryAction } from "./actions"
import { Category, Product, homeReducerStateType } from "../../common/store/types"

const initialState = {
  categories: [],
  products: [],
  productsByCategory: {}
}

export const homeReducer = createReducer(initialState, (builder) => {
  builder.
    addCase(
      storeCategoriesAction,
      (state: homeReducerStateType, action: { payload: Category[] }) => {
        state.categories = action.payload
      }
    ).
    addCase(
      storeProductsAction,
      (state: homeReducerStateType, action: { payload: Product[] }) => {
        state.products = action.payload
      }
    ).
    addCase(
      storeProductsByCategoryAction,
      (state: homeReducerStateType, action: { payload: StoreProductsByCategoryAction }) => {
        state.productsByCategory[action.payload.categoryId] = action.payload.products
      }
    )
})
