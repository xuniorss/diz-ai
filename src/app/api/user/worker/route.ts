import prismadb from '@/lib/prismadb'
import { FormWorkerSchema } from '@/models/forms/authform'
import { auth, currentUser } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

export const POST = async (req: Request) => {
	try {
		const { userId } = auth()
		const user = await currentUser()

		if (!userId || !user)
			return new NextResponse('Unauthorized', { status: 401 })

		const body = await req.json()
		const { key, name } = FormWorkerSchema.parse(body)

		if (!key || !name)
			return new NextResponse('Missing required fields', { status: 400 })

		const foundKey = await prismadb.companyKeys.findFirst({
			where: { id: key },
		})

		if (!foundKey) return new NextResponse('Key not found', { status: 404 })

		let currentDate = new Date()
		const expirationDateKey = new Date(foundKey.expirationTime!)

		if (expirationDateKey <= currentDate)
			return new NextResponse('Expired key', { status: 403 })

		if (foundKey.used) {
			return new NextResponse('This key has already been used', {
				status: 409,
			})
		}

		await prismadb.companyKeys.update({
			where: { id: key },
			data: { used: true },
		})

		const [workerUser, companyWorker] = await Promise.all([
			prismadb.user.create({
				data: { userId, name, email: user.emailAddresses[0].emailAddress },
			}),
			prismadb.companyWorkers.create({
				data: { userId, companyId: foundKey.companyId },
			}),
		])

		return NextResponse.json(
			{ ...workerUser, ...companyWorker },
			{ status: 201 },
		)
	} catch (error) {
		console.error('[WORKER_POST]', error)
		return new NextResponse('Internal Server Error', { status: 500 })
	}
}
