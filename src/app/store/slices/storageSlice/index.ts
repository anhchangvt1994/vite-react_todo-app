import { PayloadAction } from '@reduxjs/toolkit'
import { initialStorageInfo } from './constants'
import { IStorageInfo } from './types'
import userApi from 'app/apis/users'
import { IUserInfo } from '../userSlice/types'

const storageSlice = createSlice({
	name: import.meta.env.STORE_SLICE_STORAGE,
	initialState: initialStorageInfo,
	reducers: {
		setUserID: (state, action: PayloadAction<IStorageInfo['userID']>) => {
			state.userID = action.payload
			localStorage.setItem('userID', String(state.userID))
		},
		removeUserID: (state) => {
			state.userID = 0
			localStorage.removeItem('userID')
		},
	},
	extraReducers: (builder) => {
		builder.addMatcher(
			userApi.endpoints.getUser.matchFulfilled,
			(state, { payload }) => {
				state.userID = payload?.id ?? 0
				localStorage.setItem('userID', String(state.userID))
			}
		)
		builder.addMatcher(
			userApi.endpoints.login.matchFulfilled,
			(state, { payload }) => {
				state.userID = payload?.id ?? 0
				localStorage.setItem('userID', String(state.userID))
			}
		)
		builder.addMatcher(
			userApi.endpoints.register.matchFulfilled,
			(state, { payload }) => {
				state.userID = payload?.id ?? 0
				localStorage.setItem('userID', String(state.userID))
			}
		)
		builder.addMatcher(
			(action) => {
				return action.type.endsWith('user/removeUserInfo')
			},
			(state, action: PayloadAction<IUserInfo>) => {
				state.userID = action.payload?.id ?? 0
				localStorage.setItem('userID', String(state.userID))
			}
		)
	},
})

export const { setUserID, removeUserID } = storageSlice.actions
const storageReducer = storageSlice.reducer
export default storageReducer
