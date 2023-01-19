import { useDispatch } from 'react-redux'
import { TypedUseSelectorHook, useSelector } from 'react-redux'
import store, { rootState } from './Store'

export const useAppSelector: TypedUseSelectorHook<rootState> = useSelector

type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
