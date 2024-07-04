import { useGetTodoListQuery } from 'app/apis/todoList'
import { useTodoListContext } from 'pages/HomePage/context'
import ErrorComponent from './Error'

function TodoListWrapper({ className, children }) {
	const { limit } = useTodoListContext()
	const { data, isLoading, isFetching, refetch } = useGetTodoListQuery({
		limit,
	})

	const [isShowTodoList, setIsShowTodoList] = useState(!!data)
	const duration = useMemo(() => (isLoading ? 10 : 20), [isLoading])

	useEffect(() => {
		let timeout
		if (!isShowTodoList) {
			timeout = setTimeout(() => setIsShowTodoList(true), duration)
		}

		return () => timeout && clearTimeout(timeout)
	}, [isFetching])

	return (
		<>
			{isFetching || data ? (
				isShowTodoList ? (
					<div className={`grid grid-cols-4 gap-4 ${className}`}>
						{children}
					</div>
				) : !isLoading ? (
					<ErrorComponent
						className="mt-4"
						onRetry={() => {
							setIsShowTodoList(false)
							refetch()
						}}
					/>
				) : undefined
			) : (
				<ErrorComponent
					className="mt-4"
					onRetry={() => {
						setIsShowTodoList(false)
						refetch()
					}}
				/>
			)}
		</>
	)
}

export default React.memo(TodoListWrapper)
