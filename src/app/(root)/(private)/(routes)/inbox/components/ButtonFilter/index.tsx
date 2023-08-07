import { ComponentProps } from 'react'
import { tv, VariantProps } from 'tailwind-variants'

const button = tv({
	base: 'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
	variants: {
		bgColor: {
			default: 'bg-emerald-700/30 text-white/30 hover:bg-emerald-600/30',
			active: 'bg-emerald-700 text-white hover:bg-emerald-600',
		},
		size: {
			default: 'h-10 px-4 py-2',
			sm: 'h-9 rounded-md px-3',
			lg: 'h-11 rounded-md px-8',
			icon: 'h-10 w-10',
		},
	},
	defaultVariants: {
		bgColor: 'default',
		size: 'default',
	},
})

type ButtonProps = ComponentProps<'button'> & VariantProps<typeof button>

export const ButtonFilter = ({
	bgColor,
	className,
	size,
	...props
}: ButtonProps) => {
	return (
		<button className={button({ bgColor, className, size })} {...props}>
			{props.children}
		</button>
	)
}
