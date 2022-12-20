export default async function fetchData(url, method, body) {
	const response = await fetch(url, {
		method: method,
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(body),
	});
	if (!response.ok) {
		const message = `Error occured in ${response.status}`;
		throw new Error(message);
	}
	const jsonResponse = await response.json();

	if (jsonResponse.error) {
		throw new Error(jsonResponse.error);
	} else {
		return jsonResponse.data;
	}
}
