export const initialStorageInfo = (() => {
	const _userID = localStorage.getItem('userID')

	return {
		userID: _userID ? Number(_userID) : 0,
	}
})()
