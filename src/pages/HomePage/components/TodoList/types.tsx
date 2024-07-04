import { ITodoInfo } from 'app/apis/todoList/types'

export interface ITodoListParams extends React.HTMLAttributes<HTMLDivElement> {
	limit?: number
}

export interface ITodoInfoCustom extends ITodoInfo {
	isRemoving?: boolean
	isRemoved?: boolean
	isUpdating?: boolean
	isUpdated?: boolean
}
