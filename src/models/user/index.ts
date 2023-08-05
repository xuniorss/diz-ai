import { Company, CompanyWorkers, User } from '@prisma/client'

export interface UserResponse extends User {
	company: Company[]
}

export type WorkersProps = {
	user: User
} & CompanyWorkers
