export const USE_PROXY = true;

export const URL_ORIGINAL = 'http://192.168.1.253:8080/cityshop/api/';

export const URL_BASE = USE_PROXY ? 'api/' : 'http://192.168.1.253:8080/cityshop/api/';

export const URL = {
    USERS: {
        SIGNUP: "users/",
        LOGIN: "login/",
        LOGOUT: "logout/",
        UPDATE: "users/",
        CATEGORY: "category/",
        BRAND: "brand/",
        CATEGORYALL: "category/all/",
        BRANDALL: "brand/all/",
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
    },
    
    CATEGORIES: {
        ALL: "categories/",
        ADD: "categories/add/",
        REMOVE: "categories/remove/"
    },
    
    BRANDS: {
        ALL: "brands/",
        ADD: "brands/add/",
        REMOVE: "brands/remove/",
    }
    
}

export const STORAGE_KEYS = {
    USER: "cityshop_user"
}


