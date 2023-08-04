'use client'

import { clearUser, setTypeProfile } from '@/redux/user/slice'
import { useClerk } from '@clerk/nextjs'
import { LogOut, User, UserCircle2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { Button } from '../ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu'

export const DropdownUser = () => {
	const { signOut } = useClerk()
	const dispatch = useDispatch()
	const router = useRouter()

	const handleLogout = useCallback(() => {
		signOut()
		dispatch(clearUser())
		dispatch(setTypeProfile(null))

		return (window.location.href = '/')
	}, [dispatch, signOut])

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					aria-label="button open/close user dropdown"
					variant="ghost"
				>
					<UserCircle2 className="h-6 w-6" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-fit p-1.5">
				<DropdownMenuLabel>Configurações</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem>
						<User className="mr-2 h-4 w-4" />
						<span>Perfil</span>
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem>
						<Button
							aria-label="sign-out user"
							size="sm"
							onClick={handleLogout}
						>
							<LogOut className="mr-2 h-4 w-4" />
							<span>Desconectar</span>
						</Button>
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
