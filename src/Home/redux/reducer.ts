import { createReducer } from "@reduxjs/toolkit"
import { StoreProductsByCategoryAction, storeCategoriesAction, storeProductsByCategoryAction } from "./actions"
import { Category, homeReducerStateType } from "../../common/store/types"

const initialState = {
  categories: [],
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
      storeProductsByCategoryAction,
      (state: homeReducerStateType, action: { payload: StoreProductsByCategoryAction }) => {
        state.productsByCategory[action.payload.categoryId] = action.payload.products
      }
    )
})
