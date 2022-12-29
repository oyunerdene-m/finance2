import { Link } from 'react-router-dom';
import Accounts from './accounts';

export default function Home() {
	return (
		<>
			<h2> Its home page!</h2>
			<Accounts />
			<button>
				<Link to='/accounts/new'>Add new Account</Link>
			</button>
		</>
	);
}
