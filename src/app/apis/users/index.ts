import { IStorageInfo } from 'app/store/slices/storageSlice/types'
import { IRootState } from 'app/store/types'
import { Suspender } from 'utils/Suspender'
import { IRequestSingUpParams, IUserInfo } from './types'

const userApi = createApi({
	reducerPath: 'userApi',
	baseQuery: fetchBaseQuery({
		baseUrl: import.meta.env.API_BASE_URL,
	}),
	endpoints: (builder) => ({
		getUser: builder.query<IUserInfo, number>({
			query: (id) => `/users/${id}`,
			transformResponse: (res: IUserInfo[] | IUserInfo) => res?.[0] ?? res,
		}),
		login: builder.mutation<IUserInfo, { email: string; password: string }>({
			query: (credentials) => ({
				url: '/login',
				method: 'POST',
				body: credentials,
			}),
		}),
		register: builder.mutation<IUserInfo, IRequestSingUpParams>({
			query: (credentials) => ({
				url: '/users',
				method: 'POST',
				body: credentials,
			}),
			transformResponse: (res: IUserInfo[] | IUserInfo) => res?.[0] ?? res,
		}),
	}),
})

export const {
	useGetUserQuery,
	useLazyGetUserQuery,
	useLoginMutation,
	useRegisterMutation,
} = userApi

export const useGetUserQuerySuspender = (() => {
	const suspender = Suspender()

	return () => {
		const userID = useSelector<IRootState, IStorageInfo['userID']>(
			(state) => state.storage.userID
		)
		if (userID === 0) return

		if (!suspender.get()) {
			const [getUser] = userApi.useLazyGetUserQuery()

			suspender.start(() => {
				getUser(userID)
					.unwrap()
					.then((result) => suspender.resolve(result))
					.catch((err) => suspender.reject(err))
			})
		}

		return suspender.get()
	}
})()

export default userApi
