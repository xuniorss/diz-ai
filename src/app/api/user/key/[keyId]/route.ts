import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

export const DELETE = async (
	req: Request,
	{ params }: { params: { keyId: string } },
) => {
	try {
		const { userId } = auth()

		if (!userId) return new NextResponse('Unauthorized', { status: 401 })

		if (!params.keyId)
			return new NextResponse('Parameter Required', { status: 404 })

		const userRhlogged = await prismadb.user.findFirst({
			where: { userId, isRh: true },
		})

		if (!userRhlogged)
			return new NextResponse('Request without permission', { status: 403 })

		const company = await prismadb.company.findFirst({ where: { userId } })

		if (!company)
			return new NextResponse('Company not found', { status: 404 })

		const deleteSingleKey = await prismadb.companyKeys.deleteMany({
			where: { companyId: company.id, id: params.keyId },
		})

		return NextResponse.json(deleteSingleKey)
	} catch (error) {
		if (process.env.NODE_ENV !== 'production')
			console.error('[KEY_SINGLE_DELETE]', error)
		return new NextResponse('Internal Server Error', { status: 500 })
	}
}
