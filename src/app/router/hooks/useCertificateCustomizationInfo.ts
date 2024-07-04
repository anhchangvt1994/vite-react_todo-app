import { initialUserInfo } from 'app/apis/users/constants'
import { IUserInfo } from 'app/apis/users/types'
import { IStorageInfo } from 'app/store/slices/storageSlice/types'
import { IRootState } from 'app/store/types'

export interface ICertCustomizationInfo {
	user: IUserInfo
}

export default function useCertificateCustomizationInfo(): ICertCustomizationInfo {
	const userID = useSelector<IRootState, IStorageInfo['userID']>(
		(state) => state.storage.userID
	)
	const userInfo = useSelector<IRootState, IUserInfo>((state) => state.user)

	return {
		user: userID === 0 ? initialUserInfo : userInfo,
	}
}
