export function Suspender() {
	let status
	let result
	let suspender

	return {
		start(f) {
			useEffect(() => {
				return () => {
					suspender = undefined
				}
			}, [])

			if (!suspender && typeof f === 'function') {
				status = 'pending'
				const promise = f()
				suspender = promise.then(
					(r) => {
						status = 'success'
						result = r
						// suspender = undefined
					},
					(e) => {
						status = 'error'
						result = e
					}
				)
			}

			if (status === 'pending') {
				throw suspender
			} else if (status === 'success') {
				return result
			} else if (status === 'error') {
				throw result
			}
		},
	}
}

export function SuspenderOnce() {
	let status
	let result
	let suspender

	return {
		start(
			f,
			options?: {
				success?: (result) => void
				error?: (result) => void
			}
		) {
			options = {
				success: () => {},
				error: () => {},
				...options,
			}
			if (!suspender && typeof f === 'function') {
				status = 'pending'
				const promise = f()
				suspender = promise.then(
					(r) => {
						status = 'success'
						result = r
						options.success(result)
					},
					(e) => {
						status = 'error'
						result = e
						options.error(result)
					}
				)
			}

			if (status === 'pending') {
				throw suspender
			} else if (status === 'success') {
				return result
			} else if (status === 'error') {
				throw result
			}
		},
	}
}
