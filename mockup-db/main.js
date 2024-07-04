const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
const STATUS_LIST = [200, 502]
server.use(jsonServer.bodyParser).use((req, res, next) => {
	if (STATUS_LIST[Math.floor(Math.random() * 2)] === 200) {
		setTimeout(next, Math.floor(Math.random() * (1500 - 10 + 1)) + 10)
	} else {
		res.status(502).json({ error: 'Internal Server Error' })
	}
})
;((server) => {
	server.post('/api/login', async (req, res) => {
		const { email, password } = req.body

		const user = router.db.get('users').find({ email, password }).value()

		if (user) {
			res.status(200).jsonp(user)
		} else {
			res.status(401).jsonp({ error: 'Invalid username or password' })
		}
	})
})(server)

server.use('/api', router)

server.listen(3000, () => {
	console.log('JSON Server is running')
})
