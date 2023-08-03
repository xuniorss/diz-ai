import { RootState } from '@/redux/store'
import { useSelector } from 'react-redux'

export const useStoreUser = () => {
	const { userTypeProfile: typeProfile } = useSelector(
		(state: RootState) => state.userReducer,
	)

	return { typeProfile }
}
