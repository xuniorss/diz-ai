import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

export const DELETE = async (
	req: Request,
	{ params }: { params: { occurrenceId: string } },
) => {
	try {
		const { userId } = auth()

		if (!userId) return new NextResponse('Unauthorized', { status: 401 })

		if (!params.occurrenceId)
			return new NextResponse('Parameter Required', { status: 404 })

		const user = await prismadb.user.findFirst({
			where: { userId, isRh: false },
		})

		if (!user) return new NextResponse('User not found', { status: 404 })

		const company = await prismadb.companyWorkers.findFirst({
			where: { userId },
		})

		if (!company)
			return new NextResponse('Company not found', { status: 404 })

		const deleting = await prismadb.occurrencies.deleteMany({
			where: {
				id: params.occurrenceId,
				userId,
				companyId: company.companyId,
			},
		})

		return NextResponse.json(deleting)
	} catch (error) {
		console.error('[WORKER_OCCURRENCE_DELETE]', error)
		return new NextResponse('Internal Server Error', { status: 500 })
	}
}
