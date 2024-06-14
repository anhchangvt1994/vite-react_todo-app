export const EMAIL_VALIDATION_REGEX = new RegExp(
	import.meta.env.VALIDATION_EMAIL
)
export const NAME_VALIDATION_REGEX = new RegExp(
	import.meta.env.VALIDATION_NAME,
	'u'
)
