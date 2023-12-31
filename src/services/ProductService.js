import axios from 'axios';

const PRODUCT_BASE_REST_API_URL = "http://localhost:8080/api/v1/products";

class ProductService {
    getAllProducts() {
        return axios.get(PRODUCT_BASE_REST_API_URL);
    }

    createProduct(product) {
        return axios.post(PRODUCT_BASE_REST_API_URL, product);
    }

    // Corrected the function name to getProductById
    getProductById(productId) {
        return axios.get(`${PRODUCT_BASE_REST_API_URL}/${productId}`);
    }
    updateProduct(productId, product) {
        return axios.put(`${PRODUCT_BASE_REST_API_URL}/${productId}`, product);
    }
    deleteProduct(productId) {
        return axios.delete(`${PRODUCT_BASE_REST_API_URL}/${productId}`);
    }

}

// eslint-disable-next-line import/no-anonymous-default-export
export default new ProductService();