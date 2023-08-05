import { ReactNode } from 'react'

export const Container = ({ children }: { children: ReactNode }) => {
	return (
		<article className="flex h-full justify-center">
			<section className="my-5 w-full max-w-screen-lg space-y-4">
				{children}
			</section>
		</article>
	)
}
