import { WorkersProps } from '@/models/user'
import {
	selectFilterWorker,
	selectWorkers,
} from '@/redux/worker/worker.selector'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'

export const useStoreWorkers = () => {
	const workers = useSelector(selectWorkers)
	const filterStore = useSelector(selectFilterWorker)

	const workerInCompany = useMemo(() => {
		if (!filterStore || filterStore.length <= 3)
			return workers as WorkersProps[]

		return workers?.filter(
			(worker) =>
				worker.user.email === filterStore ||
				worker.user.name === filterStore,
		) as WorkersProps[]
	}, [filterStore, workers])

	return { workerInCompany, workers, filterStore }
}
