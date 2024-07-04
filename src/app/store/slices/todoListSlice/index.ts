import todoListApi from 'app/apis/todoList'

const todoListSlice = createSlice({
	name: import.meta.env.STORE_SLICE_TODO_LIST,
	initialState: [],
	reducers: {},
	extraReducers: (builder) => {
		builder.addMatcher(
			todoListApi.endpoints.getTodoList.matchFulfilled,
			(state, { payload }) => {
				Object.assign(state, payload)
			}
		)
		builder.addMatcher(
			todoListApi.endpoints.removeTodo.matchFulfilled,
			() => []
		)
	},
})

const todoListReducer = todoListSlice.reducer
export default todoListReducer
