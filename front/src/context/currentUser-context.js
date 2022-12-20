import { useState, useEffect, createContext } from 'react';
import fetchData from '../lib/fetchData';

export const UserContext = createContext(null);

export const CurrentUserProvider = (props) => {
	const [currentUser, setCurrentUser] = useState(null);
	const [isUserLoading, setIsUserLoading] = useState(true);

	useEffect(() => {
		async function getUser() {
			try {
				setIsUserLoading(true);
				const response = await fetchData('/api/v1/users/current-user', 'GET', undefined);
				setCurrentUser(response.user);
			} catch (error) {
				console.log(error);
				alert(error);
			} finally {
				setIsUserLoading(false);
			}
		}
		getUser();
	}, []);

	return (
		<UserContext.Provider value={{ currentUser, isUserLoading }}>
			{props.children}
		</UserContext.Provider>
	);
};
