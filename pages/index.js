import { useEffect } from 'react';
import Header from '../src/components/Header';
import { VStack, Container, Flex } from '@chakra-ui/react';
import AppHeader from '../src/components/AppHeader';
import InventoryLists from '../src/components/InventoryLists';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProductsRequest, getStatus } from '../src/store/medicineSlice';

export default function Home() {
	const dispatch = useDispatch();
	const fetchStatus = useSelector(getStatus);

	useEffect(() => {
		if (fetchStatus === 'idle') {
			dispatch(fetchProductsRequest());
		}
	}, [fetchStatus, dispatch]);

	return (
		<>
			<Header />
			<main>
				<VStack
					w="full"
					h={{ base: 'auto', md: '100vh' }}
					alignItems="center"
					bg="brand.gray"
				>
					<AppHeader />

					{/* <button onClick={() => dispatch(editProduct(newData))}>TEST</button> */}
					<Container maxWidth="container.md" padding={0} py={[0, 5, 20]}>
						<InventoryLists />
					</Container>
				</VStack>
			</main>

			{/* <footer className={styles.footer}>
				<a
					href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
					target="_blank"
					rel="noopener noreferrer"
				>
					Powered by{' '}
					<span className={styles.logo}>
						<Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
					</span>
				</a>
			</footer> */}
		</>
	);
}
