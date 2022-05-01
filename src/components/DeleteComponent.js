import { useRef } from 'react';
import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogContent,
	AlertDialogOverlay,
	Button,
	AlertDialogCloseButton,
	useDisclosure,
} from '@chakra-ui/react';
import { FiTrash2 } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { deleteProduct } from '../store/medicineSlice';
import { deleteStateProduct } from '../utils';

function Delete({ id }) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const cancelRef = useRef();
	const dispatch = useDispatch();

	const products = {
		products: {
			allIds: ['1', '2', '3'],
			byId: {
				1: { id: 1, name: 'Exforge 10mg', prices: [1, 2] },
				2: { id: 2, name: 'Exforge 20mg', prices: [3, 4] },
			},
		},
	};

	const deleteInventory = () => {
		dispatch(deleteProduct(id));
		// deleteStateProduct(products, id);
	};

	return (
		<>
			<Button rightIcon={<FiTrash2 />} variant="outline" onClick={onOpen}>
				Delete
			</Button>
			<AlertDialog
				motionPreset="slideInBottom"
				leastDestructiveRef={cancelRef}
				onClose={onClose}
				isOpen={isOpen}
				isCentered
			>
				<AlertDialogOverlay />

				<AlertDialogContent>
					<AlertDialogHeader>Discard Changes?</AlertDialogHeader>
					<AlertDialogCloseButton />
					<AlertDialogBody>
						Are you sure you want to discard all of your notes? 44 words will be
						deleted.
					</AlertDialogBody>
					<AlertDialogFooter>
						<Button ref={cancelRef} onClick={onClose}>
							No
						</Button>
						<Button colorScheme="red" ml={3} onClick={deleteInventory}>
							Yes
						</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
}

export default Delete;
