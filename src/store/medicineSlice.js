import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit';
import {
	addNewProduct,
	deleteStateProduct,
	editStateProduct,
	normalizeData,
} from '../utils';

const initialState = {
	products: {},
	status: 'idle', // idle, loading, succeeded, failed
	error: null,
};
export const fetchProductsRequest = createAsyncThunk(
	'products/fetchProductsRequest',
	async () => {
		try {
			const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL);
			const data = await response.json();
			return data;
		} catch (error) {
			return error.message;
		}
	}
);

const productSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		addProduct: (state, action) => {
			const newProductId = nanoid();
			const newPriceId = nanoid();
			const { name, price } = action.payload;
			const newList = addNewProduct(state.products, {
				name,
				price,
				newProductId,
				newPriceId,
			});

			state.products = newList;
		},
		editProduct: (state, action) => {
			state.products = editStateProduct(state.products, action.payload);
		},
		deleteProduct: (state, action) => {
			state.products = deleteStateProduct(state.products, action.payload);
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchProductsRequest.pending, (state, action) => {
				state.status = 'loading';
			})
			.addCase(fetchProductsRequest.fulfilled, (state, action) => {
				state.status = 'succeeded';
				const normalizedData = normalizeData(action.payload.products);
				state.products = normalizedData;
			})
			.addCase(fetchProductsRequest.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			});
	},
});

export const getStatus = ({ products }) => products.status;
export const getProducts = ({ products }) => products.products;
export const getError = ({ products }) => products.error;

export const { getAllProducts, addProduct, deleteProduct, editProduct } =
	productSlice.actions;
export default productSlice.reducer;
