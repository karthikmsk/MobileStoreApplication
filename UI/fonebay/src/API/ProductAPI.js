import axios from "axios";

const API_BASE_URL = "http://localhost:8080/product-service/api/products";

const productAPI = {
    getProductByBrand: (brand) => axios.get(`${API_BASE_URL}/brand/${brand.toUpperCase()}`),
    getProductById: (productId) => axios.get(`${API_BASE_URL}/${productId}`),
    getFilterCounts: () => axios.get(`${API_BASE_URL}/filter-counts`),
    getProductCountByBrand: (brand) => axios.get(`${API_BASE_URL}/brand/${brand}/count`),
    getProductsSortedByPriceAsc: () => axios.get(`${API_BASE_URL}/sort/price-asc`),
    getProductsSortedByPriceDesc: () => axios.get(`${API_BASE_URL}/sort/price-desc`),
    getProductsSortedByNewest: () => axios.get(`${API_BASE_URL}/sort/newest`),
    getProductsSortedByRating: () => axios.get(`${API_BASE_URL}/sort/rating`),
    getProductByNameAndColor: (productName,color) => axios.get(`${API_BASE_URL}/mobile/color-variants`, { params: { productName: productName, color: color} }),
    getProductByNameAndStorage: (productName,color,storage) => axios.get(`${API_BASE_URL}/mobile/storage-variants`, { params: { productName: productName,color: color,storage: storage} }),
    getColorsByProductName: (productName) => axios.get(`${API_BASE_URL}/colors`,{params : {productName}}),
    getStoragesByProductName: (productName,color) => axios.get(`${API_BASE_URL}/storages`,{params : {productName:productName, color:color}})
};  

export default productAPI;