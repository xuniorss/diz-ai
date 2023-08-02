'use client'

import Link from 'next/link'
import { ComponentProps, useCallback } from 'react'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '../ui/accordion'
import { buttonVariants } from '../ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '../ui/card'

interface CardProfileProps extends ComponentProps<typeof Card> {
	title: string
	description: string
	type: 'RH' | 'WORKER'
	knowMore?: string
}

export const CardProfileType = ({
	title = '',
	description = '',
	type = 'WORKER',
	knowMore = '',
	...rest
}: CardProfileProps) => {
	const onClick = useCallback(() => {}, [])

	return (
		<Card
			className="flex h-full w-full max-w-sm flex-col shadow-lg hover:shadow-xl"
			{...rest}
		>
			<CardHeader>
				<CardTitle>{title}</CardTitle>
				<CardDescription className="break-words leading-relaxed">
					{description}
				</CardDescription>
			</CardHeader>
			<CardContent className="grid flex-1 gap-4">
				<Accordion type="single" collapsible>
					<AccordionItem value={`item-1-${type}`}>
						<AccordionTrigger>Saber mais</AccordionTrigger>
						<AccordionContent className="leading-relaxed tracking-wide">
							{knowMore}
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</CardContent>
			<CardFooter>
				<Link
					href="/access"
					onClick={onClick}
					className={buttonVariants({
						variant: 'default',
						className: 'w-full',
					})}
				>
					Escolher esse
				</Link>
			</CardFooter>
		</Card>
	)
}
