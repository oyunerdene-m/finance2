import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import fetchData from '../../../lib/fetchData';
import AccountForm from './AccountForm';
import { AccountsContext } from '../../../context/accounts-context';

export default function CreateAccount() {
	const { accounts, setAccounts } = useContext(AccountsContext);

	const navigate = useNavigate();
	const [newAccount, setNewAccount] = useState({
		amount: 0,
		type: '',
		currency: '',
		name: '',
		description: '',
	});

	function changeHandler(event) {
		const { name, value } = event.target;
		setNewAccount((prevAccount) => {
			return {
				...prevAccount,
				[name]: name === 'amount' ? parseInt(value) : value,
			};
		});
	}

	async function submitHandler(event) {
		event.preventDefault();
		try {
			const data = await fetchData('/api/v1/accounts/add', 'POST', newAccount);
			setAccounts([...accounts, data.account]);
			navigate('/');
		} catch (error) {
			console.log(error);
			alert(error);
		}
	}

	return <AccountForm onSubmit={submitHandler} onChange={changeHandler} title='Add new account' />;
}
