import { PayloadAction } from '@reduxjs/toolkit'
import { IUserInfo } from './types'
import userApi from 'app/apis/users'

const userSlice = createSlice({
	name: import.meta.env.STORE_SLICE_USER,
	initialState: {},
	reducers: {
		setUserInfo: (state, action: PayloadAction<IUserInfo>) => {
			state = action.payload
		},
		removeUserInfo: () => ({}),
	},

	extraReducers: (builder) => {
		builder.addMatcher(
			userApi.endpoints.getUser.matchFulfilled,
			(state, { payload }) => {
				Object.assign(state, payload)
			}
		)
		builder.addMatcher(
			userApi.endpoints.login.matchFulfilled,
			(state, { payload }) => {
				Object.assign(state, payload)
			}
		)
		builder.addMatcher(
			userApi.endpoints.register.matchFulfilled,
			(state, { payload }) => {
				Object.assign(state, payload)
			}
		)
	},
})

export const { setUserInfo, removeUserInfo } = userSlice.actions
const userReducer = userSlice.reducer
export default userReducer
