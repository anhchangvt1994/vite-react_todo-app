import { createSelector } from '@reduxjs/toolkit'
import { ILoadingStatus } from './types'

const selectStorage = (state) => state.storage

export const selectLoadingKey = createSelector(
	[selectStorage],
	(storage): ILoadingStatus['key'] => {
		return `${storage.userID}`
	}
)
