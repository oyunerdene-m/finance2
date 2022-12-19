import { useState } from 'react';
import Form from './Form';
import fetchData from '../../lib/fetchData';

export default function Signup() {
	const [userData, setUserData] = useState({ name: '', email: '', password: '' });

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
			await fetchData('/api/v1/users/register', 'POST', userData);
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<Form userData={userData} onChange={changeHandler} onSubmit={submitHandler} formType='signup' />
	);
}
