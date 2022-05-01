import { HStack, Container, Flex, Button } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import { addProduct } from '../store/medicineSlice';
import Modal from './Modal';

function AppHeader() {
	return (
		<HStack
			as="nav"
			position="sticky"
			top="0"
			zIndex="banner"
			w="full"
			h="90px"
			justifyContent="center"
			alignItems="center"
			boxShadow="md"
		>
			<Container
				maxWidth={['container.sm', 'container.md', 'container.xl']}
				h="80%"
			>
				<Flex alignItems="center" h="full" justifyContent="space-between">
					<Link href="/" passHref>
						<a>
							<Image
								src="/images/logo.png"
								alt="Logo"
								width={120}
								height={50}
							/>
						</a>
					</Link>

					<Modal
						customBtn={<Button variant="outline">Add Product</Button>}
						initialState={{ name: '', price: '' }}
						action={addProduct}
					/>
				</Flex>
			</Container>
		</HStack>
	);
}

export default AppHeader;
