import { Link } from 'react-router-dom';

export default function Home() {
	return (
		<>
			<h2> Its home page!</h2>
			<button>
				<Link to='/accounts/new'>Add new Account</Link>
			</button>
		</>
	);
}
