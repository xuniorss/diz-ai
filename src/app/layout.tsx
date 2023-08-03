import { cn } from '@/lib/utils'
import { ClerkProvider } from '@clerk/nextjs'
import { Inter } from 'next/font/google'
import { ReactNode } from 'react'

import { Providers } from './provider'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<ClerkProvider>
			<html lang="pt-BR" suppressHydrationWarning>
				<body
					className={cn(
						'bg-secondary antialiased scrollbar-thin scrollbar-track-secondary scrollbar-thumb-secondary-foreground scrollbar-thumb-rounded',
						inter.className,
					)}
				>
					<Providers>{children}</Providers>
				</body>
			</html>
		</ClerkProvider>
	)
}
