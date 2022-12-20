import Form from './Form';
import { useState } from 'react';
import fetchData from '../../lib/fetchData';

export default function Login() {
	const [userData, setUserData] = useState({ email: '', password: '' });

	function changeHandler(event) {
		const { name, value } = event.target;
		setUserData((prevData) => {
			return {
				...prevData,
				[name]: value,
			};
		});
	}

	async function submitHandler(event) {
		event.preventDefault();
		try {
			await fetchData('/api/v1/users/login', 'POST', userData);
			window.location.reload();
		} catch (error) {
			console.log(error);
			alert(error);
		}

		setUserData({ email: '', password: '' });
	}

	return (
		<Form userData={userData} onChange={changeHandler} onSubmit={submitHandler} formType='login' />
	);
}
