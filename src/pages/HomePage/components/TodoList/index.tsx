import { faWarning } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useGetTodoListQuery } from 'app/apis/todoList'
import { useTodoListContext } from 'pages/HomePage/context'
import { TodoDetailLoader } from 'pages/TodoDetailPage/loading'
import LoadingBoundary from 'utils/LoadingBoundary'
import { TodoCardWrapper } from '../TodoCard'
import TodoListWrapper from './components/TodoListWrapper'

function TodoList(params) {
	const {
		todoList: todoListContext,
		limit,
		getTodoListDraft,
		setTodoList: setTodoListContext,
	} = useTodoListContext()

	const { data, isFetching, isError, refetch } = useGetTodoListQuery({
		limit,
	})

	useLayoutEffect(() => {
		if (!data) return

		const todoListDraft = getTodoListDraft()

		if (isError) {
			const tmpData = []
			for (const i in todoListDraft) {
				if (todoListDraft[i].isUpdating) {
					tmpData.push({
						...todoListDraft[i],
						isUpdating: false,
						isUpdated: true,
					})
					continue
				}

				tmpData.push(todoListDraft[i])
			}

			setTodoListContext(tmpData)
		} else {
			let totalTailLoader = 0
			const tmpData = []
			let j = 0
			for (const i in data) {
				if (j === limit) break

				const todo = data[i]
				if (todoListDraft[i] && Number.isNaN(todoListDraft[i].id)) {
					tmpData[i] = null
					j = Number(i) + 1
				}

				if (todoListDraft[j] && Number.isNaN(todoListDraft[j].id)) continue

				if (todoListDraft[j] && todo.id === todoListDraft[j].id) {
					if (todoListDraft[j].isRemoved) {
						totalTailLoader++
						j++
						continue
					} else if (isFetching && todoListDraft[j].isUpdated) {
						tmpData.push({
							...todoListDraft[j],
							isUpdating: true,
							isUpdated: false,
						})
						j++
						continue
					} else if (
						todoListDraft[j].isRemoving ||
						(isFetching && todoListDraft[j].isUpdating)
					) {
						tmpData.push(todoListDraft[j])
						j++
						continue
					}
				}

				tmpData.push({ ...todo, isRemoving: false, isRemoved: false })
				j++
			}

			setTodoListContext([...tmpData, ...new Array(totalTailLoader).fill(null)])
		}
	}, [isFetching])

	const todoList = useMemo(() => {
		if (!todoListContext) return

		const tmpTodoList = todoListContext.map((todo, i) => {
			if (!todo) return <TodoCardWrapper key={`${i}-loader`} isLoader={true} />

			return <TodoCardWrapper key={todo.id} data={todo} isLoader={false} />
		})

		return tmpTodoList
	}, [todoListContext])

	return (
		<>
			<TodoListWrapper className={params.className}>{todoList}</TodoListWrapper>
			{data && isError && (
				<div className="flex justify-center">
					<div className="bg-yellow-100 border border-yellow-400 rounded-lg py-2 px-3 text-yellow-800 mt-4">
						<div className="flex items-center gap-2 justify-between">
							<div className="w-6 h-6 flex-none inline-flex justify-center items-center text-xl">
								<FontAwesomeIcon icon={faWarning} />
							</div>
							<div className="text-lg font-light">
								Fail to refetch the newest Todo list, please try{' '}
								<span
									onClick={refetch}
									className="underline cursor-pointer font-medium"
								>
									refetch
								</span>{' '}
								it by manually.
							</div>
						</div>
					</div>
				</div>
			)}

			{data &&
				createPortal(
					<LoadingBoundary fallback={<TodoDetailLoader />}>
						<Outlet />
					</LoadingBoundary>,
					document.getElementById('modal')
				)}
		</>
	)
}

export default TodoList
