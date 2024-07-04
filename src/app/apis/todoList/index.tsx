import { Suspender } from 'utils/Suspender'
import { IRequestParams, ITodoInfo } from './types'
import { retry } from '@reduxjs/toolkit/query'

const customBaseQuery = retry(
	async (args, api, extraOptions) => {
		const result = await fetchBaseQuery({
			baseUrl: import.meta.env.API_BASE_URL,
		})(args, api, extraOptions)

		if (
			(api.endpoint !== 'getTodoList' && result.error) ||
			result.error?.status === 401
		) {
			retry.fail(result.error)
		}

		return result
	},
	{ maxRetries: 0 }
)

const todoListApi = createApi({
	reducerPath: 'todoListApi',
	baseQuery: customBaseQuery,
	tagTypes: [import.meta.env.STORE_TAG_TODO_LIST.type],
	endpoints: (builder) => ({
		getTodoList: builder.query<ITodoInfo[], IRequestParams>({
			query: (params) => ({
				url: '/todoList',
				params: {
					_limit: params?.limit || 10,
					_sort: 'id',
					_order: 'desc',
				},
			}),
			providesTags: (result) =>
				result
					? [
							...result.map(
								({ id }) =>
									({
										type: import.meta.env.STORE_TAG_TODO_LIST.type,
										id,
									} as const)
							),
							{
								type: import.meta.env.STORE_TAG_TODO_LIST.type,
								id: import.meta.env.STORE_TAG_TODO_LIST.id,
							},
					  ]
					: [
							{
								type: import.meta.env.STORE_TAG_TODO_LIST.type,
								id: import.meta.env.STORE_TAG_TODO_LIST.id,
							},
					  ],
		}),
		getTodoDetail: builder.query<ITodoInfo, number>({
			query: (id) => ({
				url: `/todoList/${id}`,
			}),
			keepUnusedDataFor: 0,
		}),
		addTodo: builder.mutation<ITodoInfo, Omit<ITodoInfo, 'id'>>({
			query: (data) => ({
				url: `/todoList`,
				method: 'POST',
				body: data,
			}),
			invalidatesTags: (result, error) => {
				if (error) return
				return [
					{
						type: import.meta.env.STORE_TAG_TODO_LIST.type,
						id: import.meta.env.STORE_TAG_TODO_LIST.id,
					},
				]
			},
		}),
		updateTodo: builder.mutation<ITodoInfo, ITodoInfo>({
			query: (data) => ({
				url: `/todoList/${data.id}`,
				method: 'PATCH',
				body: data,
			}),
			invalidatesTags: (result, error) => {
				if (error) return
				return [
					{
						type: import.meta.env.STORE_TAG_TODO_LIST.type,
						id: import.meta.env.STORE_TAG_TODO_LIST.id,
					},
				]
			},
		}),
		removeTodo: builder.mutation<ITodoInfo, number>({
			query: (id) => ({
				url: `/todoList/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: (result, error) => {
				if (error) return
				return [
					{
						type: import.meta.env.STORE_TAG_TODO_LIST.type,
						id: import.meta.env.STORE_TAG_TODO_LIST.id,
					},
				]
			},
		}),
	}),
})

export const {
	useGetTodoListQuery,
	useLazyGetTodoListQuery,
	useGetTodoDetailQuery,
	useLazyGetTodoDetailQuery,
	useRemoveTodoMutation,
	useUpdateTodoMutation,
	useAddTodoMutation,
} = todoListApi

export default todoListApi

export const useGetTodoDetailQuerySuspender = (() => {
	const suspender = Suspender()

	return (id: number) => {
		if (!id) return

		if (!suspender.get()) {
			const [getTodoDetail] = todoListApi.useLazyGetTodoDetailQuery()

			suspender.start(() => {
				getTodoDetail(id)
					.unwrap()
					.then((result) => suspender.resolve(result))
					.catch((err) => suspender.reject(err))
			})
		}

		const result = suspender.get()

		return result.status
			? { status: result.status, data: result.data, suspender }
			: { status: 200, data: suspender.get(), suspender }
	}
})()
