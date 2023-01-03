import { Link } from 'react-router-dom';

export default function Account({ account }) {
	return (
		<li>
			<p>{account.name}</p>
			<Link to={`/accounts/edit/${account.id}`}>
				<button>edit</button>
			</Link>

			<button>delete</button>
		</li>
	);
}
