export interface IToastInfo {
	type: 'success' | 'error' | 'warning'
	message: string
	ttl?: number
	onClose?: () => void
}

export interface IToastWrapperProps {
	className?: string
}

export interface IToastProps {
	message: string
	onDestroy?: () => void
}
