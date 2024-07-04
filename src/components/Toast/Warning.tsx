import { IToastProps } from './types'

export function ToastWarning({ message, onDestroy }: IToastProps) {
	const [isShow, setIsShow] = useState(true)

	useEffect(() => {
		const timeout = setTimeout(() => {
			setIsShow(false)
			onDestroy?.()
		}, 2000)

		return () => clearTimeout(timeout)
	}, [])

	const onClose = useCallback(() => {
		setIsShow(false)
		onDestroy?.()
	}, []) // onClose()

	return (
		isShow && (
			<div
				id="toast-danger"
				className="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
				role="alert"
			>
				<div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-500 dark:bg-orange-700 dark:text-orange-200">
					<svg
						stroke="currentColor"
						fill="currentColor"
						stroke-width="0"
						viewBox="0 0 20 20"
						aria-hidden="true"
						className="h-5 w-5"
						height="1em"
						width="1em"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fillRule="evenodd"
							d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
							clipRule="evenodd"
						></path>
					</svg>
				</div>
				<div className="ms-3 text-sm font-normal">{message}</div>
				<button
					type="button"
					className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
					data-dismiss-target="#toast-danger"
					aria-label="Close"
					onClick={onClose}
				>
					<span className="sr-only">Close</span>
					<svg
						className="w-3 h-3"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 14 14"
					>
						<path
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							stroke-width="2"
							d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
						/>
					</svg>
				</button>
			</div>
		)
	)
}
