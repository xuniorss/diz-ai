import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

export const POST = async (req: Request) => {
	try {
		const { userId } = auth()

		if (!userId) return new NextResponse('Unauthorized', { status: 401 })

		const user = await prismadb.user.findFirst({
			where: { userId, isRh: true },
		})

		if (!user) return new NextResponse('User not found', { status: 404 })

		const company = await prismadb.company.findFirst({
			where: { userId: user.userId },
		})

		if (!company)
			return new NextResponse('Company not found', { status: 404 })

		// * Generate key for 10 minutes * //
		const keys = await prismadb.companyKeys.create({
			data: {
				companyId: company.id,
				expirationTime: new Date(Date.now() + 10 * 60 * 1000),
			},
		})

		return NextResponse.json(keys)
	} catch (error) {
		console.error('[KEY_POST]', error)
		return new NextResponse('Internal Server Error', { status: 500 })
	}
}

export const DELETE = async (req: Request) => {
	try {
		const { userId } = auth()

		if (!userId) return new NextResponse('Unauthorized', { status: 401 })

		const user = await prismadb.user.findFirst({
			where: { userId, isRh: true },
		})

		if (!user) return new NextResponse('User not found', { status: 404 })

		const company = await prismadb.company.findFirst({
			where: { userId: user.userId },
		})

		if (!company)
			return new NextResponse('Company not found', { status: 404 })

		const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000) // 10 minutos atrás

		const expiredKeys = await prismadb.companyKeys.findMany({
			where: {
				companyId: company.id,
				expirationTime: { lte: tenMinutesAgo },
			},
		})

		if (expiredKeys.length <= 0)
			return new NextResponse('No expired key', { status: 404 })

		const deletePromises = expiredKeys.map((key) => {
			return prismadb.companyKeys.delete({ where: { id: key.id } })
		})

		await Promise.all(deletePromises)

		return NextResponse.json(expiredKeys)
	} catch (error) {
		console.error('[KEY_DELETE]', error)
		return new NextResponse('Internal Server Error', { status: 500 })
	}
}

export const GET = async (req: Request) => {
	try {
		const keys = await prismadb.companyKeys.findMany({
			where: { expirationTime: { gt: new Date() }, used: false },
		})

		return NextResponse.json(keys)
	} catch (error) {
		console.error('[KEY_GET]', error)
		return new NextResponse('Internal Server Error', { status: 500 })
	}
}
