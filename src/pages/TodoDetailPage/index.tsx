import { yupResolver } from '@hookform/resolvers/yup'
import { useGetTodoDetailQuery, useUpdateTodoMutation } from 'app/apis/todoList'
import { useToastListContext } from 'components/Toast/context'
import { useTodoListContext } from 'pages/HomePage/context'
import { Resolver, useForm } from 'react-hook-form'
import { TodoDetailLoader } from './loading'
import { IRequestUpdateTodoParamsForForm } from './types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRefresh, faWarning } from '@fortawesome/free-solid-svg-icons'

export default function TodoDetailPage() {
	const route = useRoute()
	const navigate = useNavigate()
	const [updateTodo, { isLoading, isSuccess, isError }] =
		useUpdateTodoMutation()
	const { updateTodoListDraft } = useTodoListContext()
	const { addToastList } = useToastListContext()

	const {
		data,
		isFetching,
		isError: isGetDetailError,
		refetch,
	} = useGetTodoDetailQuery(Number(route.params.id))

	const schema = useMemo(
		() =>
			yup.object().shape({
				title: yup.string().required('Title is required'),
				description: yup.string().required('Description is required'),
			}),
		[data]
	)

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IRequestUpdateTodoParamsForForm>({
		resolver: yupResolver(schema) as Resolver<IRequestUpdateTodoParamsForForm>,
		defaultValues: {
			title: data?.title,
			description: data?.description,
		},
	})

	useEffect(() => {
		if (isSuccess) {
			navigate(import.meta.env.ROUTER_HOME_PATH, {
				replace: true,
			})
		} else if (isError) {
			updateTodoListDraft({
				...data,
				isUpdating: false,
			})
			addToastList({
				type: 'error',
				message: 'Update task fail. Please try again later',
			})
		}
	}, [isLoading])

	const onClose = () => {
		if (isLoading) return
		navigate(import.meta.env.ROUTER_HOME_PATH, {
			replace: true,
		})
	} // onClose

	const onSubmit = useCallback(
		(requestParams: IRequestUpdateTodoParamsForForm) => {
			if (
				(data && requestParams.title !== data.title) ||
				requestParams.description !== data.description
			) {
				updateTodoListDraft({
					...data,
					isUpdating: true,
				})
				updateTodo({
					...data,
					...requestParams,
				})
			}
		},
		[data]
	) // onSubmit

	return (
		<>
			{isFetching ? (
				<TodoDetailLoader />
			) : (
				<div
					className="absolute top-0 left-0 w-full h-[100vh] bg-gray-600 bg-opacity-50"
					onClick={onClose}
				>
					<div
						className="absolute bg-white rounded-lg p-4 w-[320px] left-0 right-0 mx-auto translate-y-[-50%] top-[50%] overflow-hidden"
						onClick={(e) => e.stopPropagation()}
					>
						<div className="text-xl font-bold text-center">Task</div>
						<form onSubmit={handleSubmit(onSubmit)}>
							<label className="form-control w-full max-w-xs">
								<input
									name="title"
									type="text"
									placeholder="Title"
									className={`input input-bordered w-full max-w-xs mt-4 focus:outline-1 ${
										errors.title && 'border-error focus:outline-error'
									}`}
									autoComplete="false"
									defaultValue={data?.title}
									disabled={isGetDetailError}
									{...register('title')}
								/>
							</label>
							<label className="form-control mt-4">
								<textarea
									name="description"
									className={`textarea textarea-bordered h-24 resize-none focus:outline-1 ${
										errors.description && 'border-error focus:outline-error'
									}`}
									placeholder="Description"
									disabled={isGetDetailError}
									defaultValue={data?.description}
									{...register('description')}
								/>
							</label>
							<button type="submit" className="btn btn-primary w-full mt-4">
								Update
							</button>
						</form>

						{isGetDetailError && (
							<div className="absolute flex items-center justify-center left-0 top-0 w-full h-full bg-white bg-opacity-70 text-xxl font-bold px-4">
								<div className="bg-yellow-100 rounded-lg py-2 px-3 w-full text-yellow-800">
									<div className="flex items-center gap-3 justify-between">
										<div className="w-6 h-6 flex-none inline-flex justify-center items-center">
											<FontAwesomeIcon icon={faWarning} />
										</div>
										<div className="text-sm font-light">
											Fail to load todo detail info, please try again later.
										</div>
									</div>
									<div className="mt-1 flex justify-end">
										<button
											className="bg-yellow-800 border-none rounded-lg py-0 px-3 min-w-6 text-white hover:bg-yellow-900"
											onClick={refetch}
										>
											<FontAwesomeIcon icon={faRefresh} />
										</button>
									</div>
								</div>
							</div>
						)}
						{isLoading && (
							<div className="absolute flex items-center justify-center left-0 top-0 w-full h-full bg-white bg-opacity-70 text-xxl font-bold">
								Updating
							</div>
						)}
					</div>
				</div>
			)}
		</>
	)
}
