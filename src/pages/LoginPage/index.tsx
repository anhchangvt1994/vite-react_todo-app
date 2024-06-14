import { yupResolver } from '@hookform/resolvers/yup'
import { useGetUserQuerySuspender, useLoginMutation } from 'app/apis/users'
import { setUserID } from 'app/store/slices/storageSlice'
import { Resolver, useForm } from 'react-hook-form'
import { EMAIL_VALIDATION_REGEX } from './constants'
import { IRequestLoginParams } from './types'

const Page = styled.div``

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

const schema = yup.object({
	email: yup
		.string()
		.required('Email is required')
		.matches(EMAIL_VALIDATION_REGEX, 'Email is invalid'),
	password: yup.string().required('Password is required'),
})

export default function LoginPage() {
	const [login, { isLoading }] = useLoginMutation()
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IRequestLoginParams>({
		resolver: yupResolver(schema) as Resolver<IRequestLoginParams>,
	})

	useGetUserQuerySuspender()

	const onSubmit = useCallback((requestParams: IRequestLoginParams) => {
		login(requestParams)
	}, [])

	return (
		<Page>
			<Section>
				<Block>
					<form
						className="w-full p-4 rounded-xl border-[1px]"
						onSubmit={handleSubmit(onSubmit)}
					>
						<div className="mb-4 text-xl w-full text-center font-bold">
							Sign In
						</div>
						<label className="form-control w-full max-w-xs">
							<input
								name="email"
								type="text"
								placeholder="Email or Phone number"
								className={`input input-bordered w-full max-w-xs focus:outline-1 ${
									errors.email ? 'border-error' : ''
								}`}
								autoFocus
								{...register('email')}
							/>
							<div
								className={`label pt-[4px] ${errors.email ? '' : 'invisible'}`}
							>
								<span className="label-text-alt text-error">
									{errors.email?.message || 'Error message'}
								</span>
							</div>
						</label>
						<label className="form-control w-full max-w-xs">
							<input
								name="password"
								type="password"
								placeholder="Password"
								className={`input input-bordered w-full max-w-xs focus:outline-1 ${
									errors.password ? 'border-error' : ''
								}`}
								{...register('password')}
							/>
							<div
								className={`label pt-[4px] ${
									errors.password ? '' : 'invisible'
								}`}
							>
								<span className="label-text-alt text-error">
									{errors.password?.message || 'Error message'}
								</span>
							</div>
						</label>
						<button type="submit" className="btn btn-primary w-full">
							Login
						</button>
					</form>
					{isLoading && (
						<div className="absolute flex items-center justify-center left-0 top-0 w-full h-full bg-white bg-opacity-70 text-xxl font-bold">
							Loading
						</div>
					)}
				</Block>
			</Section>
		</Page>
	)
}
