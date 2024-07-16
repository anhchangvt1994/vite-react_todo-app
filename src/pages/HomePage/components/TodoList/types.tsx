import { ITodoInfo } from 'app/apis/todoList/types'

export interface ITodoListParams extends HTMLAttributes<HTMLDivElement> {
	limit?: number
}

export interface ITodoInfoCustom extends ITodoInfo {
	isRemoving?: boolean
	isRemoved?: boolean
	isUpdating?: boolean
	isUpdated?: boolean
}
