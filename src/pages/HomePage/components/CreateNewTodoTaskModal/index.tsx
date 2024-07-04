import { yupResolver } from '@hookform/resolvers/yup'
import { useAddTodoMutation } from 'app/apis/todoList'
import { useTodoListContext } from 'pages/HomePage/context'
import { Resolver, useForm } from 'react-hook-form'
import {
	ICreateNewTodoTaskModalProps,
	IRequestAddTodoParamsForForm,
} from './types'
import { useToastListContext } from 'components/Toast/context'

const schema = yup.object().shape({
	title: yup.string().required('Title is required'),
	description: yup.string().required('Description is required'),
	completed: yup.boolean().required('Complete is required'),
})

export default function CreateNewTodoTaskModal({
	onClose,
}: ICreateNewTodoTaskModalProps) {
	const [addTodo, { isLoading, isSuccess, isError }] = useAddTodoMutation()
	const { addTodoListDraft } = useTodoListContext()
	const { addToastList } = useToastListContext()

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IRequestAddTodoParamsForForm>({
		resolver: yupResolver(schema) as Resolver<IRequestAddTodoParamsForForm>,
		defaultValues: {
			completed: false,
		},
	})

	useEffect(() => {
		if (isSuccess) {
			onClose()
		} else if (isError) {
			addToastList({
				type: 'error',
				message: 'Add task fail. Please try again later',
			})
		}
	}, [isLoading])

	const onCloseWrapper = () => {
		if (isLoading) return
		onClose()
	} // onCloseWrapper

	const onSubmit = useCallback(
		(requestParams: IRequestAddTodoParamsForForm) => {
			addTodoListDraft()
			addTodo(requestParams)
		},
		[]
	) // onSubmit

	return (
		<>
			<div
				className="absolute top-0 left-0 w-full h-[100vh] bg-gray-600 bg-opacity-50"
				onClick={onCloseWrapper}
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
								autoFocus
								autoComplete="false"
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
								{...register('description')}
							/>
						</label>
						<button type="submit" className="btn btn-primary w-full mt-4">
							Update
						</button>
					</form>

					{isLoading && (
						<div className="absolute flex items-center justify-center left-0 top-0 w-full h-full bg-white bg-opacity-70 text-xxl font-bold">
							Creating
						</div>
					)}
				</div>
			</div>
		</>
	)
}
