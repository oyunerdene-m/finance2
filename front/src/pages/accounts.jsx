import { useContext } from 'react';
import { AccountsContext } from '../context/accounts-context';
import AccountList from '../components/Accounts/Accounts/AccountList';

export default function Accounts() {
	const { accounts, isAccountsLoading } = useContext(AccountsContext);

	if (isAccountsLoading) return <h2>Loading...</h2>;
	if (accounts.length === 0) return <h3>There are no accounts yet</h3>;
	return (
		<>
			<h1>Accounts:</h1>
			<AccountList accounts={accounts} />
		</>
	);
}
