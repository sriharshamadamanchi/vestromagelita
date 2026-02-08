import { call, put, takeLatest } from "redux-saga/effects"
import { failedLoadingAction, startLoadingAction, successLoadingAction } from "../../common/loaderRedux/actions"
import { FetchProductsByCategoryAction, fetchCategoriesAction, fetchProductsAction, fetchProductsByCategoryAction, storeCategoriesAction, storeProductsAction, storeProductsByCategoryAction } from "./actions"
import { fetchCategoriesAPI, fetchProductsAPI, fetchProductsByCategoryAPI } from "./api"

export function *fetchProductsSaga(): any {
  try {
    yield put(startLoadingAction({ name: "FetchProducts" }))
    const data = yield call(fetchProductsAPI)
    yield put(storeProductsAction(data))
    yield put(successLoadingAction({ name: "FetchProducts", msg: "" }))
  } catch (error: any) {
    console.log("error in FetchProducts", error)
    yield put(failedLoadingAction({ name: "FetchProducts", msg: "" }))
  }
}

export function *fetchCategoriesSaga(): any {
  try {
    yield put(startLoadingAction({ name: "FetchCategories" }))
    const data = yield call(fetchCategoriesAPI)
    yield put(storeCategoriesAction(data))
    yield put(successLoadingAction({ name: "FetchCategories", msg: "" }))
  } catch (error: any) {
    console.log("error in FetchCategories", error)
    yield put(failedLoadingAction({ name: "FetchCategories", msg: "" }))
  }
}

export function *fetchProductsByCategorySaga(action: { payload: FetchProductsByCategoryAction }): any {
  const { categoryId } = action.payload
  try {
    yield put(startLoadingAction({ name: "FetchProductsByCategory" }))
    const data = yield call(fetchProductsByCategoryAPI, { categoryId })
    yield put(storeProductsByCategoryAction({ categoryId, products: data }))
    yield put(successLoadingAction({ name: "FetchProductsByCategory", msg: "" }))
  } catch (error: any) {
    console.log("error in FetchProductsByCategory", error)
    yield put(failedLoadingAction({ name: "FetchProductsByCategory", msg: "" }))
  }
}

const homeSagas = [
  takeLatest(fetchCategoriesAction, fetchCategoriesSaga),
  takeLatest(fetchProductsByCategoryAction, fetchProductsByCategorySaga),
  takeLatest(fetchProductsAction, fetchProductsSaga)
]

export default homeSagas;
