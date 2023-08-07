import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

export const PATCH = async (
	req: Request,
	{ params }: { params: { occurrenceId: string } },
) => {
	try {
		const { userId } = auth()

		if (!userId) return new NextResponse('Unauthorized', { status: 401 })

		if (!params.occurrenceId)
			return new NextResponse('Parameter Required', { status: 404 })

		const patchOccurrence = await prismadb.occurrencies.update({
			where: { id: params.occurrenceId },
			data: { read: true },
		})

		return NextResponse.json(patchOccurrence)
	} catch (error) {
		console.error('[RH_OCCURRENCE_PATCH]', error)
		return new NextResponse('Internal Server Error', { status: 500 })
	}
}
