export interface IRequestSignUpParamsForForm {
	name: string
	email: string
	password: string
	confirmPassword: string
	date: number
	month: number
	year: number
	gender: string
}

export interface IRequestSignUpParams
	extends Omit<
		IRequestSignUpParamsForForm,
		'confirmPassword' | 'date' | 'month' | 'year' | 'gender'
	> {
	birthday: number
	gender: number
}

export interface IDateOption {
	code?: number | string
	value?: number | string
	title?: number | string
}
