import { RoutesProps } from '@/models/navigation'
import { Home, Key, Users } from 'lucide-react'

export const routes: RoutesProps[] = [
	{ icon: Home, href: '/home', label: 'Início' },
	{ icon: Users, href: '/workers', label: 'Pessoas' },
	{ icon: Key, href: '/keys', label: 'Chaves' },
]
