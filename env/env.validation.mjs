export default {
	prefix: 'validation',
	data: {
		email: '^$|^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$',
		name: '^(?=.*[\\p{L}])[ \\p{L}]{2,40}$',
	},
}
