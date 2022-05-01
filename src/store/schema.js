import { schema } from 'normalizr';

// definite normalizr entity schemas
const priceEntity = new schema.Entity('prices');
export const productsEntity = new schema.Entity('products', {
	prices: [priceEntity],
});

const priceSchema = new schema.Entity('prices');
export const productsSchema = new schema.Entity('products', {
	prices: [priceSchema],
});
