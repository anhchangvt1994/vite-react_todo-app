import { selectLoadingKey } from 'app/store/slices/loadingStatusSlice'
import { ILoadingStatus } from 'app/store/slices/loadingStatusSlice/types'
import { removeUserInfo } from 'app/store/slices/userSlice'
import { IUserInfo } from 'app/store/slices/userSlice/types'
import { IRootState } from 'app/store/types'
import ErrorLoadingPageComponent from 'components/ErrorPageComponent'
import LoadingPageComponent from 'components/LoadingPageComponent'
import ToastListProvider from 'components/Toast/context'
import ErrorBoundary from 'utils/ErrorBoundary'
import LoadingBoundary from 'utils/LoadingBoundary'

const MainContainer = styled.div`
	max-width: 1280px;
	min-width: 0;
	min-height: 100vh;
	padding: 16px;
	margin: 0 auto;
`

const Header = styled.header`
	padding: 16px;
	text-align: right;
`

function Layout() {
	const dispatch = useDispatch()
	const route = useRoute()
	const loadingKey = useSelector<IRootState, ILoadingStatus['key']>(
		selectLoadingKey
	)
	const userInfo = useSelector<IRootState, IUserInfo>((state) => state.user)

	const routeID = useMemo(() => route.id.split('-')[0], [route.id])

	return (
		<div className="layout">
			<MainContainer>
				<Header>
					{userInfo.id ? (
						<button
							className="btn"
							onClick={() => {
								dispatch(removeUserInfo())
							}}
						>
							Logout
						</button>
					) : route.id === import.meta.env.ROUTER_LOGIN_ID ? (
						<Link
							className="btn btn-primary"
							to={import.meta.env.ROUTER_SIGN_UP_PATH}
						>
							Sign Up
						</Link>
					) : (
						<Link
							className="btn btn-primary"
							to={import.meta.env.ROUTER_LOGIN_PATH}
						>
							Sign In
						</Link>
					)}
				</Header>
				<ErrorBoundary fallback={<ErrorLoadingPageComponent />}>
					<LoadingBoundary delay={150} fallback={<LoadingPageComponent />}>
						<ToastListProvider>
							<Outlet />
						</ToastListProvider>
					</LoadingBoundary>
				</ErrorBoundary>
			</MainContainer>
		</div>
	)
} // App()

export default Layout
