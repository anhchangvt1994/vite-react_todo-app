import { ITodoInfoCustom, ITodoListContext } from './types'

const INIT_TODO_LIST: ITodoInfoCustom[] = new Array(10).fill(null)
const TMP_TODO_INFO = {
	id: NaN,
	title: '',
	description: '',
	completed: false,
}

const INIT_LIMIT = 10

export const TodoListContext = createContext<ITodoListContext>({
	// NOTE - TodoList Info
	todoList: INIT_TODO_LIST,
	getTodoListDraft: () => null,
	setTodoList: () => null,
	setTodoListDraft: () => null,
	updateTodoList: () => null,
	updateTodoListDraft: () => null,
	addTodoList: () => null,
	addTodoListDraft: () => null,

	// NOTE - Limit
	limit: INIT_LIMIT,
	setLimit: () => null,
})

export function TodoListProvider({ children }) {
	const [todoList, setTodoList] =
		useState<ITodoListContext['todoList']>(INIT_TODO_LIST)
	const [limit, setLimit] = useState<ITodoListContext['limit']>(INIT_LIMIT)
	const todoListDraft = useRef<ITodoInfoCustom[]>(INIT_TODO_LIST)

	todoListDraft.current =
		todoList && todoList[todoList.length - 1] ? todoList : todoListDraft.current

	const getTodoListDraft = useCallback(
		() => todoListDraft.current,
		[todoListDraft]
	) // getTodoListDraft()

	const setTodoListDraft = useCallback(
		(payload: ITodoInfoCustom[]) => {
			if (!payload) return
			todoListDraft.current = payload
		},
		[todoListDraft]
	) // setTodoListDraft()

	const addTodoList = useCallback(
		(options) => {
			options = {
				addTo: 'begin',
				...(options || {}),
			}

			const newTodoList = (() => {
				switch (true) {
					case options.addTo === 'end':
						return [...todoList, TMP_TODO_INFO]
					default:
						return [TMP_TODO_INFO, ...todoList]
				}
			})()

			setTodoList(newTodoList)
		},
		[todoList]
	) // addTodoList()

	const addTodoListDraft = useCallback(
		(options) => {
			if (INIT_TODO_LIST === todoListDraft.current) return
			options = {
				addTo: 'begin',
				...(options || {}),
			}

			const newTodoList = (() => {
				switch (true) {
					case options.addTo === 'end':
						return [...todoListDraft.current, TMP_TODO_INFO]
					default:
						return [TMP_TODO_INFO, ...todoListDraft.current]
				}
			})()

			setTodoListDraft(newTodoList)
		},
		[todoListDraft]
	) // addTodoListDraft()

	const updateTodoList = useCallback(
		(payload: ITodoInfoCustom) => {
			if (!payload) return
			const newTodoList = todoList.map((item) => {
				if (item && payload.id === item.id) {
					return payload
				}
				return item
			})
			setTodoList(newTodoList)
		},
		[todoList]
	) // updateTodoList()

	const updateTodoListDraft = useCallback(
		(payload: ITodoInfoCustom) => {
			if (!payload) return
			const newTodoList = todoListDraft.current.map((item) => {
				if (item && payload.id === item.id) {
					return payload
				}
				return item
			})

			setTodoListDraft(newTodoList)
		},
		[todoListDraft]
	) // updateTodoListDraft()

	return (
		<TodoListContext.Provider
			value={{
				// NOTE - TodoList Info
				todoList,
				getTodoListDraft,
				setTodoList,
				setTodoListDraft,
				updateTodoList,
				updateTodoListDraft,
				addTodoList,
				addTodoListDraft,

				// NOTE - Limit
				limit,
				setLimit,
			}}
		>
			{children}
		</TodoListContext.Provider>
	)
}

export function useTodoListContext() {
	return useContext(TodoListContext)
}
