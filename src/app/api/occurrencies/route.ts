import prismadb from '@/lib/prismadb'
import { NextResponse } from 'next/server'

export const GET = async (req: Request) => {
	try {
		const occurrence = await prismadb.occurrenciesTypes.findMany({
			orderBy: { createdAt: 'asc' },
		})

		if (occurrence.length <= 0)
			return new NextResponse('No Occurrence found', { status: 404 })

		return NextResponse.json(occurrence)
	} catch (error) {
		if (process.env.NODE_ENV !== 'production')
			console.error('[OCCURENCE_GET]', error)
		return new NextResponse('Internal Server Error', { status: 500 })
	}
}
