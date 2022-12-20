import { useState } from 'react';
import fetchData from '../../../lib/fetchData';
import AccountForm from './AccountForm';

export default function CreateAccount() {
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
				[name]: value,
			};
		});
	}

	async function submitHandler(event) {
		event.preventDefault();
		try {
			await fetchData('/api/v1/accounts/add', 'POST', newAccount);
		} catch (error) {
			console.log(error);
			alert(error);
		}
	}

	return <AccountForm onSubmit={submitHandler} onChange={changeHandler} />;
}
