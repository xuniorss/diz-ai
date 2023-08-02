import { cn } from '@/lib/utils'
import { Inter } from 'next/font/google'
import { ReactNode } from 'react'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="pt-BR">
			<body className={cn('antialiased', inter.className)}>{children}</body>
		</html>
	)
}
