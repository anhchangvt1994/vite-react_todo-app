import { IToastInfo, IToastListContext } from './types'

const INIT_TOAST_LIST: IToastInfo[] = []

const LIMIT = 4

export const ToastListContext = createContext<IToastListContext>({
	toastList: INIT_TOAST_LIST,
	addToastList: () => null,
	setToastList: () => null,
})

export default function ToastListProvider({ children }) {
	const [toastList, setToastList] = useState<IToastInfo[]>(INIT_TOAST_LIST)

	const addToastList = useCallback(
		(payload: IToastInfo) => {
			if (!payload) return
			const newToastList = [payload, ...toastList]
			if (newToastList.length > LIMIT) {
				newToastList.splice(newToastList.length - 1, 1)
			}

			setToastList(newToastList)
		},
		[toastList]
	) // addToastList()

	return (
		<ToastListContext.Provider
			value={{
				toastList,
				addToastList,
				setToastList,
			}}
		>
			{children}
		</ToastListContext.Provider>
	)
}

export function useToastListContext() {
	return useContext(ToastListContext)
}
