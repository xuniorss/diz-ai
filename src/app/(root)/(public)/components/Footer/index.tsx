export const FooterPublic = () => {
	const currentYear = new Date().getFullYear()

	return (
		<footer className="flex items-center justify-center p-10">
			<section>
				<p className="text-sm text-muted-foreground">
					Desenvolvido e mantido por xuniors. &copy; {currentYear}
				</p>
			</section>
		</footer>
	)
}
