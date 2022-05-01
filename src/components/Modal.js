import React, { useRef, useState } from 'react';
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Button,
	FormControl,
	FormLabel,
	Input,
	useDisclosure,
	Spinner,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { addProduct } from '../store/medicineSlice';

function ModalComponent({ customBtn, initialState, action }) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const initialRef = useRef();
	const dispatch = useDispatch();

	const [formData, setFormData] = useState({
		name: initialState.name,
		price: initialState.price,
	});

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const resetFormData = () =>
		setFormData({
			name: initialState.name,
			price: initialState.price,
		});
	const handleSubmit = (e) => {
		e.preventDefault();

		const isNameSame = formData.name === initialState.name;
		const isPriceSame =
			parseFloat(formData.price).toFixed(3) ===
			parseFloat(initialState.price).toFixed(3);

		//Check if there was an update
		if (isNameSame && isPriceSame) {
			onClose();
			return;
		}

		const newData = {
			...initialState,
			name: formData.name,
			price: parseFloat(formData.price).toFixed(2),
			type:
				isNameSame && !isPriceSame
					? 'price'
					: !isNameSame && isPriceSame
					? 'name'
					: 'both',
		};

		dispatch(action(newData));
		resetFormData();
		onClose();
	};

	//Add the onClick handler as a prop to the custom button
	const ButtonElement = React.cloneElement(customBtn, {
		onClick: onOpen,
	});
	return (
		<>
			{ButtonElement}

			<Modal
				initialFocusRef={initialRef}
				isOpen={isOpen}
				onClose={() => {
					resetFormData();
					onClose();
				}}
			>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Add Product</ModalHeader>
					<ModalCloseButton />
					<form onSubmit={handleSubmit}>
						<ModalBody pb={6}>
							<FormControl isRequired>
								<FormLabel htmlFor="name">Product name</FormLabel>
								<Input
									variant="filled"
									ref={initialRef}
									placeholder="Product name"
									name="name"
									value={formData.name}
									onChange={handleChange}
								/>
							</FormControl>

							<FormControl mt={4} isRequired>
								<FormLabel htmlFor="price">Price</FormLabel>
								<Input
									variant="filled"
									placeholder="Price"
									name="price"
									type="number"
									min="1"
									step="any"
									value={formData.price}
									onChange={handleChange}
								/>
							</FormControl>
						</ModalBody>
						<ModalFooter>
							<Button
								type="submit"
								mr={3}
								bg="brand.main"
								color="white"
								_hover={{ bg: 'brand.main' }}
								_active={{ bg: 'brand.main' }}
							>
								Save
							</Button>
							<Button
								onClick={() => {
									resetFormData();
									onClose();
								}}
							>
								Cancel
							</Button>
							{/* <Spinner color="brand.main" /> */}
						</ModalFooter>
					</form>
				</ModalContent>
			</Modal>
		</>
	);
}

export default ModalComponent;
