import { useContext } from 'react';
import { AccountsContext } from '../context/accounts-context';
import AccountList from '../components/Accounts/Accounts/AccountList';

export default function Accounts() {
	const { accounts, setAccounts } = useContext(AccountsContext);

	if (accounts.length === 0) return <h1>Loading...</h1>;

	return <AccountList accounts={accounts} />;
}
