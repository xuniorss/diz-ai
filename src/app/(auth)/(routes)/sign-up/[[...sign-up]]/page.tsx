import { SignUp } from '@clerk/nextjs'

export default function Page() {
	return (
		<SignUp
			afterSignUpUrl={process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL}
		/>
	)
}
