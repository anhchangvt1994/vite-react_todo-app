import router from 'app/router/index'
import store from 'app/store'
import 'assets/styles/main.css'
import 'assets/styles/tailwind.css'
import { Provider } from 'react-redux'

const root = createRoot(document.getElementById('root'))

root.render(
	<StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</StrictMode>
)
