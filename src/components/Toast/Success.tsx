import { IToastProps } from './types'

export function ToastSuccess({ message, onDestroy }: IToastProps) {
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
				<div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
					<svg
						stroke="currentColor"
						fill="currentColor"
						strokeWidth="0"
						viewBox="0 0 20 20"
						aria-hidden="true"
						className="h-5 w-5"
						height="1em"
						width="1em"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fillRule="evenodd"
							d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
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
							strokeWidth="2"
							d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
						/>
					</svg>
				</button>
			</div>
		)
	)
}
