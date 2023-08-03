import prismadb from '@/lib/prismadb'
import { FormRhSchema } from '@/models/forms/authform'
import { auth, currentUser } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

export const POST = async (req: Request) => {
	try {
		const { userId } = auth()
		const user = await currentUser()

		if (!userId || !user)
			return new NextResponse('Unauthorized', { status: 401 })

		const body = await req.json()
		const { companyName, cnpj, name } = FormRhSchema.parse(body)

		if (!companyName || !cnpj || !name)
			return new NextResponse('Missing required fields', { status: 400 })

		const [rhUser, rhCompany] = await Promise.all([
			prismadb.user.create({
				data: {
					userId,
					name,
					isRh: true,
					email: user.emailAddresses[0].emailAddress,
				},
			}),
			prismadb.company.create({ data: { companyName, cnpj, userId } }),
		])

		return NextResponse.json({ ...rhUser, ...rhCompany }, { status: 200 })
	} catch (error) {
		console.error('[RH_POST]', error)
		return new NextResponse('Internal Server Error', { status: 500 })
	}
}
