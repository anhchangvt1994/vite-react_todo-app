module.exports = {
	plugins: [require('daisyui')],
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			keyframes: {
				'ping-small': {
					'75%, 100%': {
						transform: 'scaleY(1.35) scaleX(1.05)',
						opacity: 0,
					},
				},
			},
			animation: {
				'ping-small': 'ping-small 0.75s linear',
			},
		},
	},
}
