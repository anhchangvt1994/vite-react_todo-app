export interface IRequestAddTodoParamsForForm {
	title: string
	description: string
	completed: boolean
}

export interface ICreateNewTodoTaskModalProps {
	onClose: () => void
}
