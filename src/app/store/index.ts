import userApi from 'app/apis/users'
import storageReducer from './slices/storageSlice'
import userReducer from './slices/userSlice'

const store = configureStore({
	reducer: {
		[import.meta.env.STORE_SLICE_STORAGE]: storageReducer,
		[import.meta.env.STORE_SLICE_USER]: userReducer,
		[userApi.reducerPath]: userApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(userApi.middleware),
})

export default store
