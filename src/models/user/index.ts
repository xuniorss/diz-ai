import { Company, User } from '@prisma/client'

interface UserRhProps extends User {
	company: Company[]
}

export type UserResponse = {
	data: UserRhProps | User | null
}
