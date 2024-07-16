export interface IToastInfo {
	type: 'success' | 'error' | 'warning'
	message: string
	ttl?: number
	onClose?: () => void
}

export interface IToastWrapperProps {
	className?: string
	toastList: IToastInfo[]
}

export interface IToastProps {
	message: string
}

export interface IToastListContext {
	toastList: IToastInfo[]
	addToastList: (payload: IToastInfo) => void
	setToastList: Dispatch<SetStateAction<IToastInfo[]>>
}
