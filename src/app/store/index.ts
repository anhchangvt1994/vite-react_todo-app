import userApi from 'app/apis/users'
import storageReducer from './slices/storageSlice'
import userReducer from './slices/userSlice'
import todoListReducer from './slices/todoListSlice'
import todoListApi from 'app/apis/todoList'

const store = configureStore({
	reducer: {
		[import.meta.env.STORE_SLICE_STORAGE]: storageReducer,
		[import.meta.env.STORE_SLICE_USER]: userReducer,
		[import.meta.env.STORE_SLICE_TODO_LIST]: todoListReducer,
		[userApi.reducerPath]: userApi.reducer,
		[todoListApi.reducerPath]: todoListApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware()
			.concat(userApi.middleware)
			.concat(todoListApi.middleware),
})

export default store
