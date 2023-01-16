import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { rootState } from './Store'

export const useAppSelector: TypedUseSelectorHook<rootState> = useSelector
