export default function Account({ account }) {
	return (
		<li>
			<p>{account.name}</p>
			<button>edit</button>
			<button>delete</button>
		</li>
	);
}
