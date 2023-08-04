import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

export const GET = async (req: Request) => {
	try {
		const { userId } = auth()

		if (!userId) return new NextResponse('Unauthorized', { status: 401 })

		const userRh = await prismadb.user.findFirst({
			where: { userId, isRh: true },
		})

		const userWorker = await prismadb.user.findFirst({
			where: { userId, isRh: false },
		})

		if (userRh) {
			const rhinfo = await prismadb.user.findFirst({
				where: { userId, isRh: true },
				include: { company: true },
			})

			if (rhinfo?.company.length === 0)
				return new NextResponse('Data Not Found', { status: 404 })

			return NextResponse.json(rhinfo)
		}

		if (userWorker) return NextResponse.json(userWorker)
	} catch (error) {
		console.error('[USER_GET]', error)
		return new NextResponse('Internal Server Error', { status: 500 })
	}
}
