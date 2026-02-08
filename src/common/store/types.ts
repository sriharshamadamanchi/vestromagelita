
export type loginReducerStateType = {
    loggedIn: boolean,
    user: {
        email: string,
        id: string,
        name: string
    }
}

export type loaderType = {
    loading: boolean,
    success?: {
        status: boolean,
        msg: string
    },
    failure?: {
        status: boolean,
        msg: string,
        id?: string
    },
    msg?: string
};

export type loaderReducerStateType = {
    loading: boolean,
    loaders: Record<string, loaderType>
};

export interface homeReducerStateType {
    categories: Category[]
    productsByCategory: Record<string, Product[]>
};

export type storeType = {
    loader: loaderReducerStateType,
    login: loginReducerStateType,
    home: homeReducerStateType
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  image: string;
  creationAt: string;
  updatedAt: string;
}

export interface Product {
  id: number;
  title: string;
  slug: string;
  price: number;
  description: string;
  category: Category;
  images: string[];
  creationAt: string;
  updatedAt: string;
}
