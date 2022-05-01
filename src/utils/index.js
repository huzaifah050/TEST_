import { normalize } from 'normalizr';
import { productsEntity } from '../store/schema';
import { nanoid } from '@reduxjs/toolkit';

export const normalizeData = (payload) => {
	const normalizedData = normalize(payload, [productsEntity]);
	return {
		products: {
			byId: {
				...normalizedData.entities.products,
			},
			allIds: [...Object.keys(normalizedData.entities.products)],
		},
		prices: {
			byId: { ...normalizedData.entities.prices },
			allIds: [...Object.keys(normalizedData.entities.prices)],
		},
	};
};

export const currentPrice = (priceArr) => {
	const currentDate = Math.max(...priceArr.map((e) => new Date(e.date)));
	const currentPrice = priceArr.find(
		(price) => new Date(price.date).getTime() === currentDate
	);

	return currentPrice;
};

export const addNewProduct = (
	products,
	{ name, price, newProductId, newPriceId }
) => {
	products.products.byId[newProductId] = {
		id: newProductId,
		name,
		prices: [newPriceId],
	};

	products.products.allIds = [...products.products.allIds, newProductId];
	products.prices.byId[newPriceId] = {
		id: newProductId,
		price: parseInt(price),
		date: new Date().toISOString(),
	};
	products.prices.allIds = [...products.prices.allIds, newPriceId];
	return products;
};

export const deleteStateProduct = (state, productId) => {
	state.products.allIds = state.products.allIds.filter(
		(id) => id.toString() !== productId.toString()
	);
	delete state.products.byId[productId];
	return state;
};

const updateNameOnly = (state, payload) => {
	state.products.byId[payload.productId].name = payload.name;
	return state;
};

const updateToCurrentPrice = (state, payload) => {
	const products = state.products;
	const prices = state.prices;
	const newPriceId = nanoid();

	prices.byId[newPriceId] = {
		id: newPriceId,
		price: payload.price,
		date: new Date().toISOString(),
	};
	prices.allIds = [...prices.allIds, newPriceId.toString()];

	products.byId[payload.productId].prices = [
		...products.byId[payload.productId].prices,
		newPriceId,
	];
	return state;
};
export const editStateProduct = (state, payload) => {
	switch (payload.type) {
		case 'name':
			return updateNameOnly(state, payload);
		case 'price':
			return updateToCurrentPrice(state, payload);
		case 'both':
			return updateToCurrentPrice(updateNameOnly(state, payload), payload);
		default:
			return state;
	}
};
