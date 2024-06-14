const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

// Add custom routes before JSON Server router
server.get('/echo', (req, res) => {
	res.jsonp(req.query)
})

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)

// Use default router

;((server) => {
	server.post('/api/login', async (req, res) => {
		const { email, password } = req.body

		const user = router.db.get('users').find({ email, password }).value()

		await new Promise((res) => setTimeout(res, 2000))

		if (user) {
			res.status(200).jsonp(user)
		} else {
			res.status(401).jsonp({ error: 'Invalid username or password' })
		}
	})

	server.get('/api/users/1', async (req, res) => {
		await new Promise((res) => setTimeout(res, 2000))
		res.send({
			id: 1,
			name: 'Nguyễn Minh Trường',
			email: 'abc@gmail.com',
			locationId: 1,
		})
	})
})(server)

server.use('/api', router)

server.listen(3000, () => {
	console.log('JSON Server is running')
})
