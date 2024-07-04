export default function ErrorComponent({ className, onRetry }) {
	const [isFirstError, setIsFirstError] = useState(true)
	const isShowErrorBackgroundPing = useMemo(
		() => (isFirstError ? false : true),
		[isFirstError]
	)
	const key = useRef(Date.now())

	const onRetryWrapper = () => {
		key.current = Date.now()
		setIsFirstError(false)
		onRetry()
	} // onRetryWrapper()

	return (
		<div className={`relative ${className}`}>
			{isShowErrorBackgroundPing && (
				<div
					key={`${key.current}`}
					className="animate-ping-small absolute left-0 right-0 top-0 bottom-0 m-auto p-4 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 -z-10"
					role="alert"
				/>
			)}
			<div
				className="p-4 text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
				role="alert"
			>
				<div className="flex items-center">
					<svg
						className="flex-shrink-0 w-4 h-4 me-2"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="currentColor"
						viewBox="0 0 20 20"
					>
						<path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"></path>
					</svg>
					<span className="sr-only">Info</span>
					<h3 className="text-lg font-medium">This todo list is empty</h3>
				</div>
				<div className="mt-2 mb-4 text-sm">
					Some network or server errors occurred, while fetching data. Please
					try again later.
				</div>
				<div className="flex">
					<button
						type="button"
						className="text-white bg-red-800 hover:bg-red-900 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-1.5 me-2 text-center inline-flex items-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
						onClick={onRetryWrapper}
					>
						Retry
					</button>
				</div>
			</div>
		</div>
	)
}
