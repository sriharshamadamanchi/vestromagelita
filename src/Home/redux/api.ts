import { mainAxios } from "../../common/apiWrapper"

export const fetchProductsAPI = async () => {
  const { data } = await mainAxios.get("/products")

  return data
}

export const fetchCategoriesAPI = async () => {
  const { data } = await mainAxios.get("/categories")

  return data
}

export const fetchProductsByCategoryAPI = async ({ categoryId }:{ categoryId: number }) => {
  const { data } = await mainAxios.get(`/products/?categoryId=${categoryId}`)

  return data
}
