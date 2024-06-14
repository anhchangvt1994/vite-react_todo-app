import { IStorageInfo } from 'app/store/slices/storageSlice/types'
import { IRootState } from 'app/store/types'
import { Suspender } from 'utils/Suspender'
import { initialUserInfo } from './constants'
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

const suspense = Suspender()
export const useGetUserQuerySuspender = () => {
	const userID = useSelector<IRootState, IStorageInfo['userID']>(
		(state) => state.storage.userID
	)
	if (userID === 0) return
	const result = userApi.useGetUserQuery(userID, { skip: userID === 0 })

	const [getUser] = userApi.useLazyGetUserQuery()

	suspense.start(() => {
		if (result.status === 'uninitialized')
			return new Promise((res) => res(initialUserInfo))

		return getUser(userID).unwrap()
	})
}

export default userApi
