import { Resolver, useForm } from 'react-hook-form'
import { EMAIL_VALIDATION_REGEX, NAME_VALIDATION_REGEX } from './constants'
import {
	IDateOption,
	IRequestSignUpParams,
	IRequestSignUpParamsForForm,
} from './types'
import { yupResolver } from '@hookform/resolvers/yup'
import { SelectMemo } from 'components/Select'
import { useRegisterMutation } from 'app/apis/users'

const Section = styled.section`
	height: 100vh;
`

const Block = styled.div`
	position: relative;
	display: flex;
	max-width: 320px;
	flex-wrap: wrap;
	justify-content: center;
	left: 50%;
	top: 10%;
	transform: translate(-50%);
`

const schema = yup.object().shape({
	email: yup
		.string()
		.required('Email is required')
		.matches(EMAIL_VALIDATION_REGEX, 'Email is invalid'),
	name: yup
		.string()
		.required('Name is required')
		.matches(NAME_VALIDATION_REGEX, 'Name is invalid'),
	password: yup.string().required('Password is required'),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref('password'), null], 'Password must match'),
	date: yup.number().required(),
	month: yup.number().required(),
	year: yup.number().required(),
	gender: yup.string().required('Gender is required'),
})

export default function SignUpPage() {
	const {
		register,
		handleSubmit,
		watch,
		getValues,
		setValue,
		formState: { errors },
	} = useForm<IRequestSignUpParamsForForm>({
		resolver: yupResolver(schema) as Resolver<IRequestSignUpParamsForForm>,
		defaultValues: {
			gender: '1',
		},
	})
	const [signUp, { isLoading }] = useRegisterMutation()

	const [passwordLevelState, setPasswordLevelState] = useState(0)
	const selectedMonth = watch('month')
	const selectedYear = watch('year')

	const dateList = useMemo(() => {
		const tmpDatelist = []
		for (let i = 1; i <= 31; i++) {
			tmpDatelist.push({ value: i, title: i })
		}

		return tmpDatelist
	}, [])
	const [dates, setDates] = useState<IDateOption[]>(dateList)

	const monthList = useMemo(() => {
		const tmpMonthList = []
		for (let i = 1; i <= 12; i++) {
			tmpMonthList.push({ value: i, title: i })
		}

		return tmpMonthList
	}, [])
	const [months] = useState<IDateOption[]>(monthList)

	const yearList = useMemo(() => {
		const currentYear = new Date().getFullYear()
		const tmpYearList = []
		for (let i = 1920; i <= currentYear; i++) {
			tmpYearList.push({ value: i, title: i })
		}

		return tmpYearList
	}, [])

	const [years] = useState<IDateOption[]>(yearList)

	useEffect(() => {
		if (selectedMonth && selectedYear) {
			const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate()
			const dateList: IDateOption[] = []
			for (let i = 1; i <= daysInMonth; i++) {
				dateList.push({ value: i, title: i })
			}
			const curDate = getValues('date')
			setDates(dateList)
			setValue(
				'date',
				(dateList[curDate - 1]?.value ??
					dateList[dateList.length - 1].value) as number
			)
		}
	}, [selectedMonth, selectedYear])

	let timeoutOnInput: NodeJS.Timeout
	const onPasswordChange = (ev: any) => {
		if (errors.password?.message) {
			if (passwordLevelState > 0) setPasswordLevelState(0)
			return
		}

		if (timeoutOnInput) clearTimeout(timeoutOnInput)

		timeoutOnInput = setTimeout(() => {
			const inputValue = ev.target.value
			let tmpLevel = 0
			if (/[a-z]/g.test(inputValue)) tmpLevel++
			if (/[A-Z]/g.test(inputValue)) tmpLevel++
			if (/\d/g.test(inputValue)) tmpLevel++
			if (/[!@#$%^&*(),.?":{}|<>]/g.test(inputValue)) tmpLevel++

			setPasswordLevelState(tmpLevel)
		}, 150)
	}

	const onSubmit = useCallback((requestParams: IRequestSignUpParamsForForm) => {
		const requestParamsFormatted: IRequestSignUpParams = {
			name: requestParams.name,
			password: requestParams.password,
			email: requestParams.email as string,
			gender: Number(requestParams.gender),
			birthday: new Date(
				`${requestParams.month}/${requestParams.date}/${requestParams.year}`
			).getTime(),
		}

		signUp(requestParamsFormatted)
	}, [])

	return (
		<>
			<Section>
				<Block>
					<form
						className="w-full p-4 rounded-xl border-[1px]"
						onSubmit={handleSubmit(onSubmit)}
					>
						<div className="mb-4 text-xl w-full text-center font-bold">
							Sign Up
						</div>

						<label className="form-control w-full max-w-xs">
							<input
								name="name"
								type="text"
								placeholder="Full name"
								className={`input input-bordered w-full max-w-xs focus:outline-1 ${
									errors.name && 'border-error'
								}`}
								autoFocus
								autoComplete="false"
								{...register('name')}
							/>
							<div className={`label pt-[4px]`}>
								<span className="label-text-alt text-xs text-gray-500">
									The full name must have 2 to 40 characters, only accept
									alphabets
								</span>
							</div>
						</label>

						<label className="form-control w-full max-w-xs">
							<input
								name="email"
								type="text"
								placeholder="Email"
								className={`input input-bordered w-full max-w-xs focus:outline-1 ${
									errors.email && 'border-error'
								}`}
								autoComplete="false"
								{...register('email')}
							/>
							<div className={`label pt-[4px]`}>
								<span className="label-text-alt text-xs text-gray-500">
									The email must have just only one [ @ ] and [ . ] symbols
								</span>
							</div>
						</label>

						<label className="form-control w-full max-w-xs">
							<input
								name="password"
								type="password"
								placeholder="Password"
								className={`input input-bordered w-full max-w-xs focus:outline-1 ${
									errors.password && 'border-error'
								}`}
								onInput={onPasswordChange}
								{...register('password')}
							/>
							<div className="flex py-2 pl-1">
								<div
									className={`w-[25px] h-[10px] border-[1px] border-gray-300 ${
										passwordLevelState >= 1 ? 'bg-primary border-primary' : ''
									}`}
								/>
								<div
									className={`w-[25px] h-[10px] border-[1px] border-gray-300 ml-1 ${
										passwordLevelState >= 2 ? 'bg-primary border-primary' : ''
									}`}
								/>
								<div
									className={`w-[25px] h-[10px] border-[1px] border-gray-300 ml-1 ${
										passwordLevelState >= 3 ? 'bg-primary border-primary' : ''
									}`}
								/>
							</div>
						</label>

						<label className="form-control w-full max-w-xs">
							<input
								name="confirmPassword"
								type="password"
								placeholder="Confirm Password"
								className={`input input-bordered w-full max-w-xs focus:outline-1 ${
									errors.confirmPassword && 'border-error'
								}`}
								{...register('confirmPassword')}
							/>
							<div
								className={`label py-[4px] ${
									errors.confirmPassword ? '' : 'invisible'
								}`}
							>
								<span className="label-text-alt text-error">
									{errors.confirmPassword?.message || 'Error message'}
								</span>
							</div>
						</label>

						<div className="flex gap-2">
							<SelectMemo
								renderSelect={{
									list: dates,
									select: {
										name: 'date',
									},
								}}
								register={register}
							/>
							<SelectMemo
								renderSelect={{
									list: months,
									select: {
										name: 'month',
									},
								}}
								register={register}
							/>
							<SelectMemo
								renderSelectWrap={{
									className: 'w-full max-w-xs',
								}}
								renderSelect={{
									list: years,
									select: {
										name: 'year',
										defaultValue: yearList[yearList.length - 1].value,
									},
								}}
								register={register}
							/>
						</div>

						<div className="flex mt-4">
							<label className="inline-flex items-center">
								<input
									type="radio"
									className="radio radio-primary"
									{...register('gender')}
									value="1"
								/>
								<span className="ml-2">Male</span>
							</label>
							<label className="inline-flex items-center ml-3">
								<input
									type="radio"
									className="radio radio-primary"
									{...register('gender')}
									value="2"
								/>
								<span className="ml-2">Female</span>
							</label>
						</div>

						<button type="submit" className="btn btn-primary w-full mt-4">
							Register
						</button>
					</form>

					{isLoading && (
						<div className="absolute flex items-center justify-center left-0 top-0 w-full h-full bg-white bg-opacity-70 text-xxl font-bold">
							Loading
						</div>
					)}
				</Block>
			</Section>
		</>
	)
} // SignUpPage()
