import { memo } from 'react'
import { FieldValues, Path, UseFormRegister } from 'react-hook-form'
import { ISelectOption } from './types'

interface ISelectProp {
	renderSelectWrap?: HTMLProps<HTMLLabelElement>
	renderSelect: {
		select?: HTMLProps<HTMLSelectElement>
		list?: Array<ISelectOption>
	}
	renderOption?: HTMLProps<HTMLOptionElement>
	renderWarningLabel?: string
	register?: UseFormRegister<any>
}

const Select = ({
	renderSelect,
	renderSelectWrap,
	renderOption,
	renderWarningLabel,
	register,
}: ISelectProp) => {
	const { list, select } = renderSelect

	if (!list || !list.length) {
		return
	} else if (select && !select.name) {
		console.error('name of select need provide to submit!')
		return
	}

	const registerResult =
		select?.name && register
			? register(select?.name as Path<FieldValues>)
			: { name: select?.name }

	const OptionList = list.map((item) => {
		const value = item.code || item.value

		if (!value)
			return (
				<option
					key={item.title}
					{...renderOption}
					disabled
					selected
					hidden
					style={{
						display: 'none',
					}}
				>
					{item.title}
				</option>
			)
		return (
			<option key={value} value={value} {...renderOption}>
				{item.title}
			</option>
		)
	})

	return (
		<>
			<label
				{...renderSelectWrap}
				className={`form-control ${renderSelectWrap?.className}`}
			>
				<select
					{...select}
					className={`select select-bordered ${select.className}`}
					{...registerResult}
				>
					{OptionList}
				</select>
			</label>
		</>
	)
} // Select

export const SelectMemo = memo(Select)
