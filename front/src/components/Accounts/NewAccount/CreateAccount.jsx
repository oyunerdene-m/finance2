import { useState } from 'react';
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

	function submitHandler(event) {
		event.preventDefault();
		console.log(newAccount);
	}

	return <AccountForm onSubmit={submitHandler} onChange={changeHandler} />;
}
