export interface ITodoInfo {
	id: number
	title: string
	description: string
	completed: boolean
}

export interface ITodoInfoCustom extends ITodoInfo {
	isRemoving?: boolean
	isRemoved?: boolean
	isUpdating?: boolean
	isUpdated?: boolean
}

export interface IAddTodoListOptionsParams {
	addTo: 'begin' | 'end'
}

export interface ITodoListContext {
	// NOTE - TodoList Info
	todoList: ITodoInfoCustom[]
	getTodoListDraft: () => ITodoInfoCustom[]
	setTodoList: React.Dispatch<React.SetStateAction<ITodoInfoCustom[]>>
	setTodoListDraft: (todoList: ITodoInfoCustom[]) => void
	updateTodoList: (todo: ITodoInfoCustom) => void
	updateTodoListDraft: (todo: ITodoInfoCustom) => void
	addTodoList: (options?: IAddTodoListOptionsParams) => void
	addTodoListDraft: (options?: IAddTodoListOptionsParams) => void

	// NOTE - Limit
	limit: number
	setLimit: React.Dispatch<React.SetStateAction<number>>
}
