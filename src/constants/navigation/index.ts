import { RoutesProps } from '@/models/navigation'
import { Home, Inbox, Key, Users } from 'lucide-react'

export const rhRoutes: RoutesProps[] = [
	{ icon: Home, href: '/home', label: 'Início' },
	{ icon: Inbox, href: '/inbox', label: 'Inbox' },
	{ icon: Users, href: '/workers', label: 'Pessoas' },
	{ icon: Key, href: '/keys', label: 'Chaves' },
]

export const workRoutes: RoutesProps[] = [
	{ icon: Home, href: '/home', label: 'Início' },
]
