import { ITodoInfo } from 'app/apis/todoList/types'
import { IUserInfo } from 'app/apis/users/types'
import { IStorageInfo } from './slices/storageSlice/types'
import { IUserInfo as IUserInfoSlice } from './slices/userSlice/types'

export interface IRootState {
	storage: IStorageInfo
	user: IUserInfoSlice
	todoList: ITodoInfo[]
	userApi: { data: IUserInfo }
}
