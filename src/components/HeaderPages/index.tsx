interface HeaderPagesProps {
	title: string
	subtitle?: string
}

export const HeaderPages = ({
	title = '',
	subtitle = '',
}: HeaderPagesProps) => {
	return (
		<span className="leading-relaxed">
			<h1 className="text-xl font-bold text-primary md:text-2xl lg:text-3xl">
				{title}
			</h1>
			{subtitle && <p className="text-primary/60">{subtitle}</p>}
		</span>
	)
}
