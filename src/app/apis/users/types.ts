export interface IUserInfo {
	id: number
	name: string
	email: string
	// avatar: string
	// birthday: string
	// gender: string
}

export interface IRequestSingUpParams {
	name: string
	email: string
	password: string
	birthday: number
	gender: number
}
