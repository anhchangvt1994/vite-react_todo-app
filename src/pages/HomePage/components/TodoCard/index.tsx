import { faBan, faFilePen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRemoveTodoMutation } from 'app/apis/todoList'
import { useToastListContext } from 'components/Toast/context'
import { useTodoListContext } from 'pages/HomePage/context'
import { ITodoCardParams } from './types'

function TodoCardLoader() {
	return (
		<div className="animate-pulse border rounded-lg border-gray-300">
			<div className="flex gap-2 border-b border-b-gray-300 py-2 px-3">
				<div className="bg-gray-300 h-4 w-full"></div>
				<div className="flex gap-1">
					<div className="bg-red-300 h-4 w-4 rounded-full" />
				</div>
			</div>
			<div className="py-2 px-3 flex flex-col gap-3">
				<div className="bg-gray-300 h-4 w-full"></div>
				<div className="bg-gray-300 h-4 w-[80%]"></div>
				<div className="bg-gray-300 h-4 w-[60%]"></div>
			</div>
		</div>
	)
}

function TodoCard({ data }: Omit<ITodoCardParams, 'isLoader'>) {
	const { updateTodoListDraft } = useTodoListContext()
	const [remove, { isLoading, isSuccess, isError }] = useRemoveTodoMutation()
	const { addToastList } = useToastListContext()

	if (isLoading) updateTodoListDraft({ ...data, isRemoving: true })
	else if (isSuccess)
		updateTodoListDraft({ ...data, isRemoving: false, isRemoved: true })

	useEffect(() => {
		if (isError)
			addToastList({
				type: 'error',
				message: 'Remove todo fail. Please try again later',
			})
	}, [isError])

	return (
		data && (
			<Link
				to={`/${getSlug(data.title)}-${data.id}`}
				onClick={(e) => {
					if (
						data.isRemoved ||
						data.isUpdated ||
						data.isRemoving ||
						data.isUpdating
					)
						e.preventDefault()
				}}
				className="border rounded-lg border-gray-300 relative overflow-hidden"
			>
				<div className="flex gap-2 border-b border-b-gray-300 py-2 px-3">
					<div className="text-ellipsis font-bold overflow-hidden w-full">
						{data.title}
					</div>
					<div className="flex gap-2 items-center">
						<button
							onClick={(e) => {
								e.preventDefault()
								remove(data.id)
							}}
							className="bg-red-300 h-4 w-4 rounded-full cursor-pointer"
						/>
					</div>
				</div>
				<div className="py-2 px-3">
					<p className="line-clamp-3">{data.description}</p>
				</div>
				{(isLoading ||
					isSuccess ||
					data.isRemoved ||
					data.isUpdating ||
					data.isUpdated) && (
					<div className="absolute flex items-center justify-center left-0 top-0 w-full h-full bg-white bg-opacity-85 text-xxl font-bold">
						{data.isUpdating && 'Updating'}
						{(isLoading || data.isRemoving) && 'Removing'}
						{data.isUpdated && (
							<FontAwesomeIcon
								icon={faFilePen}
								className="text-green-600 text-3xl"
							/>
						)}
						{data.isRemoved && (
							<FontAwesomeIcon icon={faBan} className="text-red-500 text-3xl" />
						)}
					</div>
				)}
			</Link>
		)
	)
}

export function TodoCardWrapper({
	isLoader,
	...restOfParams
}: ITodoCardParams) {
	return isLoader ? <TodoCardLoader /> : <TodoCard {...restOfParams} />
}
