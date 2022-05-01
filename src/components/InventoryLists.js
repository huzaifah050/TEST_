import {
	Heading,
	VStack,
	Spinner,
	Alert,
	AlertIcon,
	AlertTitle,
	AlertDescription,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { getStatus, getProducts } from '../store/medicineSlice';
import Card from './Card';

function InventoryLists() {
	const data = useSelector(getProducts);
	const fetchStatus = useSelector(getStatus);

	return (
		<VStack>
			<Heading
				as="h4"
				marginBottom={12}
				fontSize="xl"
				lineHeight="30px"
				letterSpacing="-0.02em"
			>
				Products Information
			</Heading>

			{fetchStatus === 'failed' ? (
				<Alert status="error">
					<AlertIcon />
					<AlertTitle>Error</AlertTitle>
					<AlertDescription>
						Something went wrong, please check your internet connection and try
						again.
					</AlertDescription>
				</Alert>
			) : null}

			{fetchStatus === 'loading' ? <Spinner color="brand.main" /> : null}
			<VStack w="100%" spacing="12">
				{fetchStatus === 'succeeded'
					? data.products.allIds
							.map((id) => data.products.byId[id])
							.map((product) => <Card key={product.id} product={product} />)
					: null}
			</VStack>
		</VStack>
	);
}

export default InventoryLists;
