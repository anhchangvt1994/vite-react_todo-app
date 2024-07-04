export default {
	prefix: 'router',
	data: {
		base: {
			path: '/',
		},
		home: {
			path: '/',
			id: 'TodoListPage',
		},
		todo_detail: {
			path: ':slugs',
			id: 'TodoListPage_TodoDetailPage',
		},
		content: {
			path: ':slugs',
		},
		content_comment: {
			path: 'comment',
		},
		comment: {
			path: 'comment/detail',
			id: 'CommentPage',
		},
		login: {
			path: 'login',
			id: 'LoginPage',
		},
		sign_up: {
			path: 'sign-up',
			id: 'SignUpPage',
		},
		not_found: {
			path: '*',
		},
	},
}
