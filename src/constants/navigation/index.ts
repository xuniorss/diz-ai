import { RoutesProps } from '@/models/navigation'
import { Home, Inbox, Key, MailPlus, Users } from 'lucide-react'

export const rhRoutes: RoutesProps[] = [
	{ icon: Home, href: '/home', label: 'Início' },
	{ icon: Inbox, href: '/inbox', label: 'Inbox', hasNotifications: true },
	{ icon: Users, href: '/workers', label: 'Pessoas' },
	{ icon: Key, href: '/keys', label: 'Chaves' },
]

export const workRoutes: RoutesProps[] = [
	{ icon: Home, href: '/home', label: 'Início' },
	{ icon: MailPlus, href: '/register', label: 'Registrar' },
]
