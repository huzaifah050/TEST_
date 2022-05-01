import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
	colors: {
		brand: {
			gray: '#F4F7FE',
			main: '#ff8a54',
			white: '#FFFFFF',
		},
		font: {
			white: '#FFFFFF',
			light_gray: '#8F9BBA',
			dark_gray: '#1B2559',
		},
	},
	fonts: {
		heading: `DM Sans`,
		body: `DM Sans`,
	},
	components: {
		Button: {
			variants: {
				primary: {
					rounded: '0.625rem',
					backgroundColor: 'brand.blue',
					color: 'font.white',
					_hover: {
						backgroundColor: 'gray.50',
						ring: 2,
						ringColor: 'brand.blue',
						color: 'brand.blue',
					},
					_disabled: {
						backgroundColor: 'brand.disabledButtonBg',
						color: 'brand.disabledButtonText',
					},

					_active: {
						backgroundColor: 'gray.100',
					},
				},
				outline: {
					backgroundColor: 'brand.gray',
					color: 'brand.main',
					borderColor: 'brand.main',
					borderWidth: '1px',
					_hover: {
						backgroundColor: 'brand.main',
						color: 'brand.white',
					},

					_active: {
						backgroundColor: 'brand.main',
						color: 'brand.white',
						outline: 'none',
					},
				},
			},
		},
		Input: {
			variants: {
				filled: {
					field: {
						_focus: {
							borderColor: 'transparent',
							ring: 2,
							ringColor: 'brand.main',
						},
					},
				},
			},
		},
		IconButton: {
			_active: {
				borderColor: 'transparent',
			},
			_hover: {
				backgroundColor: 'transparent',
			},
		},
	},
});

export default theme;
