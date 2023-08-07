import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'

export const LinkBack = ({ href }: { href: string }) => {
	return (
		<Link
			href={href}
			aria-label={`Link back to ${href}`}
			className="flex items-center justify-center rounded-full p-1 hover:bg-primary-foreground"
		>
			<ChevronLeft className="h-7 w-7" />
		</Link>
	)
}
