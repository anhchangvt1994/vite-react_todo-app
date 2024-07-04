import { ToastWrapper } from 'components/Toast/ToastWrapper'
import CreateNewTodoTaskModal from './components/CreateNewTodoTaskModal'
import TodoList from './components/TodoList'
import { TodoListProvider } from './context'

function HomePage() {
	const [isShowCreateNewTodoTaskModal, setIsShowCreateNewTodoTaskModal] =
		useState(false)
	const onClickCreateNewTask = () => {
		setIsShowCreateNewTodoTaskModal(true)
	}

	const onCloseCreateNewTodoTaskModal = () => {
		setIsShowCreateNewTodoTaskModal(false)
	}

	return (
		<>
			<div className="home-page">
				<div className="flex">
					<button
						className="btn bg-green-600 border-green-600 text-white hover:bg-green-500 hover:border-green-500"
						onClick={onClickCreateNewTask}
					>
						+ Create new task
					</button>
				</div>
				<TodoListProvider>
					<TodoList className="mt-6" />
					{isShowCreateNewTodoTaskModal &&
						createPortal(
							<CreateNewTodoTaskModal
								onClose={onCloseCreateNewTodoTaskModal}
							/>,
							document.getElementById('modal')
						)}
				</TodoListProvider>
			</div>
			<ToastWrapper />
		</>
	)
}

export default HomePage
