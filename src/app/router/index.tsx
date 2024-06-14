import Layout from 'Layout'
import NotFoundPage from 'pages/NotFoundPage'
import { RouteObject } from 'react-router-dom'
import { LoadingInfoProvider } from './context/LoadingInfoContext'
import { RouteObjectCustomize } from './types'
import { withLazy } from './utils/LazyComponentHandler'
import RouterDeliver from './utils/RouterDeliver'
import RouterInit from './utils/RouterInit'
import RouterProtection from './utils/RouterProtection'
import RouterValidation from './utils/RouterValidation'

// NOTE - Router Configuration
const routes: RouteObjectCustomize[] = [
	{
		path: import.meta.env.ROUTER_BASE_PATH,
		element: (
			<LoadingInfoProvider>
				<RouterInit>
					<RouterValidation NotFoundPage={NotFoundPage}>
						<RouterDeliver>
							<RouterProtection waitingVerifyRouterIDList>
								<Layout />
							</RouterProtection>
						</RouterDeliver>
					</RouterValidation>
				</RouterInit>
			</LoadingInfoProvider>
		),
		handle: {
			protect(certInfo, route) {
				const userInfo = certInfo.user

				if (
					![
						import.meta.env.ROUTER_LOGIN_ID,
						import.meta.env.ROUTER_SIGN_UP_ID,
					].includes(route.id) &&
					(!userInfo || !userInfo.email)
				)
					return import.meta.env.ROUTER_LOGIN_PATH

				return true
			},
		},
		children: [
			{
				index: true,
				path: import.meta.env.ROUTER_HOME_PATH,
				element: withLazy(() => import('pages/HomePage')),
			}, // Home Page
			{
				path: import.meta.env.ROUTER_CONTENT_PATH,
				element: withLazy(() => import('pages/ContentPage')),
				handle: {
					params: {
						validate(p) {
							if (typeof p.slugs === 'string') {
								return /\d+$/.test(p.slugs as string)
							}

							return true
						},
						split(p) {
							return {
								slug: p.slugs?.match(/^[a-zA-Z-_.]+[a-zA-Z]/)?.[0],
								id: p.slugs?.match(/\d+$/)?.[0],
							}
						},
					},
				},
				children: [
					{
						path: import.meta.env.ROUTER_CONTENT_COMMENT_PATH,
						element: withLazy(
							() => import('components/comment-page/CommentRow')
						),
					},
					{
						id: import.meta.env.ROUTER_COMMENT_ID,
						path: import.meta.env.ROUTER_COMMENT_PATH,
						element: withLazy(() => import('pages/CommentPage')),

						handle: {
							protect(certInfo) {
								const userInfo = certInfo.user

								if (!userInfo || !userInfo.email)
									return import.meta.env.ROUTER_LOGIN_PATH

								return true
							},
						},
					},
				],
			}, // Content Page
			{
				id: import.meta.env.ROUTER_LOGIN_ID,
				path: import.meta.env.ROUTER_LOGIN_PATH,
				element: withLazy(() => import('pages/LoginPage')),
				handle: {
					protect(certInfo) {
						const userInfo = certInfo.user

						if (userInfo && userInfo.email) {
							switch (true) {
								case !!certInfo.successPath:
									return certInfo.successPath
								case certInfo.navigateInfo?.from &&
									!certInfo.navigateInfo.from.fullPath.includes(
										import.meta.env.ROUTER_SIGN_UP_PATH
									):
									return certInfo.navigateInfo.from.fullPath
								default:
									return import.meta.env.ROUTER_HOME_PATH
							}
						}

						return true
					},
				},
			}, // Login Page
			{
				id: import.meta.env.ROUTER_SIGN_UP_ID,
				path: import.meta.env.ROUTER_SIGN_UP_PATH,
				element: withLazy(() => import('pages/SignUpPage')),
				handle: {
					protect(certInfo) {
						const userInfo = certInfo.user

						if (userInfo && userInfo.email) {
							switch (true) {
								case !!certInfo.successPath:
									return certInfo.successPath
								case certInfo.navigateInfo?.from &&
									!certInfo.navigateInfo.from.fullPath.includes(
										import.meta.env.ROUTER_LOGIN_PATH
									):
									return certInfo.navigateInfo.from.fullPath
								default:
									return import.meta.env.ROUTER_HOME_PATH
							}
						}

						return true
					},
				},
			},
			{
				path: import.meta.env.ROUTER_NOT_FOUND_PATH,
				element: <NotFoundPage />,
			},
		],
	},
]

const router = createBrowserRouter(routes as RouteObject[], {
	basename: '/',
})

export default router
