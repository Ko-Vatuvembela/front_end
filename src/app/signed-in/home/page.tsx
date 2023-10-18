import SessionProvider from '@/app/provider/session';

const session = new SessionProvider();

export default function HomePage() {
	const data = session.getUserData();
	console.log(data);
	return (
		<>
			<h1>VERIFY ACCOUNT {data}</h1>
		</>
	);
}
