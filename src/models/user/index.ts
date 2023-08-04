import { Company, User } from '@prisma/client'

export interface UserResponse extends User {
	company: Company[]
}
