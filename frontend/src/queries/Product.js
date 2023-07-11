//import { collection, doc, getDoc, getDocs } from "firebase/firestore";
const PRODUCTS_API = 'http://localhost:8080/api/products'
export const getProducts = async (limit, page, category, stock, sort) => {
    try {

        const params = {
            limit: limit ? `limit=${limit}&` : '',
            page: page ? `page=${page}&` : '',
            category: category ? `category=${category}&` : '',
            stock: stock ? `stock=${stock}&` : '',
            sort: sort ? `sort=${sort}&` : '',
        }

        const query = `${PRODUCTS_API}?${params.category}${params.limit}${params.page}${params.stock}${params.sort}`
        const response = await fetch(query)
        return await response.json()

    } catch (error) {
        throw new Error(error)
    }
};

export const getProductById = async (id) => {
    try {
        const query = `${PRODUCTS_API}/${id}`
        console.log('query: ' + query);
        const response = await fetch(query)
        if (response.ok) {
            return await response.json()
        }
        return null
    } catch (error) {
        throw new Error(error)
    }
}
