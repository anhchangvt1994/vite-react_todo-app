import type {
	ReactElement,
	ReactNode,
	MutableRefObject,
	Dispatch,
	SetStateAction,
} from 'react'

const FallbackComponent = ({
	delay,
	fallback,
}: {
	delay: number
	fallback: ReactNode
}): ReactNode => {
	const [isShow, setIsShow] = useState(delay === 0 ? true : false)

	useEffect(() => {
		const timeout =
			delay &&
			setTimeout(function () {
				setIsShow(true)
			}, delay)
		const timeout2 = setTimeout(() => {})

		return () =>
			timeout &&
			(() => {
				clearTimeout(timeout)
			})()
	}, [])

	return isShow ? fallback : ''
}

export default function LoadingBoundary({
	children,
	delay,
	fallback,
	finish,
}: {
	children?: ReactNode | undefined
	delay?: number
	fallback?: ReactNode
	finish?: (payload: { renewID?: number }) => void
}): ReactElement {
	const delayTime: number = Number(delay) || 0
	const Component: ReactNode = (
		<FallbackComponent delay={delayTime} fallback={fallback} />
	)
	const [mainComponent, setMainComponent] = useState(fallback)

	useLayoutEffect(() => {
		setMainComponent(children)
	}, [])

	return <Suspense fallback={Component}>{mainComponent}</Suspense>
} // LoadingBoundary
