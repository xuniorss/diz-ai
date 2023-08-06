import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

type RequestProps = {
	message: string
	occurrenceTypeId: string
	email: string | null | undefined
}

export const POST = async (req: Request) => {
	try {
		const { userId } = auth()

		if (!userId) return new NextResponse('Unauthorized', { status: 401 })

		const user = await prismadb.user.findFirst({
			where: { userId, isRh: false },
		})

		if (!user) return new NextResponse('User not found', { status: 404 })

		const company = await prismadb.companyWorkers.findFirst({
			where: { userId },
		})

		if (!company)
			return new NextResponse('Company not found', { status: 404 })

		const body = await req.json()
		const { message, occurrenceTypeId, email } = body as RequestProps

		if (!message || !occurrenceTypeId)
			return new NextResponse('Missing required fields', { status: 400 })

		const occurrencies = await prismadb.occurrencies.create({
			data: {
				message,
				occurrenceTypeId,
				email,
				userId,
				companyId: company.companyId,
			},
		})

		return NextResponse.json(occurrencies)
	} catch (error) {
		console.error('[WORKER_OCCURRENCE_POST]', error)
		return new NextResponse('Internal Server Error', { status: 500 })
	}
}
