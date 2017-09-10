export const USE_PROXY = true;

export const URL_ORIGINAL = 'http://192.168.1.2:8080/cityshop/api/';

export const URL_BASE = USE_PROXY ? 'api/' : 'http://192.168.1.2:8080/cityshop/api/';

export const URL = {
    USERS: {
        SIGNUP: "users/",
        LOGIN: "login/",
        LOGOUT: "logout/",
        UPDATE: "users/",
        CATEGORY: "category/",
        BRAND: "brand/"
    },
    
    STORES: {
        ALLSTORE: "stores/",
        STORE: "store/",
        CATEGORY: "store/categories/",
        BRAND: "store/brands/"
    },
    
    PRODUCTS: {
        ALLPRODUCT: "products/",
        PRODUCT: "product/",
        CATEGORY: "product/category/",
        BRAND: "product/brand/"
    }
    
}

export const STORAGE_KEYS = {
    USER: "cityshop_user"
}


