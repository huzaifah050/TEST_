import {
	Heading,
	VStack,
	Text,
	HStack,
	Spacer,
	Button,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { MdOutlineModeEditOutline } from 'react-icons/md';
import DeleteComponent from './DeleteComponent';
import { editProduct, getProducts } from '../store/medicineSlice';
import { currentPrice } from '../utils';
import ModalComponent from './Modal';

function Card({ product }) {
	const data = useSelector(getProducts);
	const prices = data.products.byId[product.id].prices.map(
		(priceId) => data.prices.byId[priceId]
	);

	return (
		<VStack bg="#fff8f5" w="100%" h="16" shadow="md" rounded="md">
			<HStack w="95%" h="full">
				<VStack w="60%" alignItems="start">
					<Text fontSize="18px">{product.name}</Text>
					<p>
						Current Price: GH₵
						{parseFloat(currentPrice(prices).price).toFixed(2)}
					</p>
				</VStack>
				<Spacer />
				<VStack w="30%" alignItems="end">
					<HStack>
						<ModalComponent
							customBtn={
								<Button
									leftIcon={<MdOutlineModeEditOutline />}
									variant="outline"
								>
									Edit
								</Button>
							}
							initialState={{
								name: product.name,
								price: currentPrice(prices).price,
								productId: product.id,
								priceId: product.prices[0],
							}}
							action={editProduct}
						/>

						<DeleteComponent id={product.id} />
					</HStack>
				</VStack>
			</HStack>
		</VStack>
	);
}

export default Card;
