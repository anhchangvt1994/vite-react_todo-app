import { ToastError } from './Error'
import { ToastSuccess } from './Success'
import { ToastWarning } from './Warning'
import { useToastListContext } from './context'
import { IToastWrapperProps } from './types'

export function ToastWrapper({ className }: IToastWrapperProps) {
	const { toastList, setToastList } = useToastListContext()
	const ToastList = useMemo(() => {
		const tmpToastList = toastList.map((item, i) => {
			if (!item) return
			const key = `${i}_${item.type}_${Date.now()}`
			switch (true) {
				case item.type === 'success':
					return (
						<ToastSuccess
							key={key}
							message={item.message}
							onDestroy={() => {
								const toastListCloned = [...toastList]
								toastListCloned[i] = undefined
								setToastList(toastListCloned)
							}}
						/>
					)
				case item.type === 'warning':
					return (
						<ToastWarning
							key={key}
							message={item.message}
							onDestroy={() => {
								const toastListCloned = [...toastList]
								toastListCloned[i] = undefined
								setToastList(toastListCloned)
							}}
						/>
					)
				default:
					return (
						<ToastError
							key={key}
							message={item.message}
							onDestroy={() => {
								const toastListCloned = [...toastList]
								toastListCloned[i] = undefined
								setToastList(toastListCloned)
							}}
						/>
					)
			}
		})

		return [...tmpToastList]
	}, [toastList])

	return createPortal(
		<div
			className={`flex flex-col items-center fixed left-0 bottom-0 w-full justify-center pb-4 ${
				className || ''
			}`}
		>
			{ToastList}
		</div>,
		document.getElementById('toast-message')
	)
}
