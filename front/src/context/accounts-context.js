import { useState, useEffect, createContext } from 'react';
import fetchData from '../lib/fetchData';

export const AccountsContext = createContext({ accounts: [] });

export const AccountsProvider = (props) => {
	const [accounts, setAccounts] = useState([]);
	const [isAccountsLoading, setIsAccountsLoading] = useState(true);

	useEffect(() => {
		async function getAccounts() {
			try {
				setIsAccountsLoading(true);
				const response = await fetchData('/api/v1/accounts', 'GET', undefined);
				setAccounts(response.accounts);
			} catch (error) {
				console.error(error);
				alert(error);
			} finally {
				setIsAccountsLoading(false);
			}
		}

		getAccounts();
	}, []);

	return (
		<AccountsContext.Provider value={{ accounts, setAccounts, isAccountsLoading }}>
			{props.children}
		</AccountsContext.Provider>
	);
};
