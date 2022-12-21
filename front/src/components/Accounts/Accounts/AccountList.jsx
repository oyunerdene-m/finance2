import Account from './Account';

export default function AccountsList({ accounts }) {
	return (
		<ul>
			{accounts.map((account) => (
				<Account key={account.id} account={account} />
			))}
		</ul>
	);
}
