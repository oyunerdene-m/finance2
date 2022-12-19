export default function Form({ formType, onSubmit, onChange, userData }) {
	return (
		<form onSubmit={onSubmit}>
			<h2>{formType}</h2>
			{formType === 'signup' && (
				<div>
					<label htmlFor='name'>User name:</label>
					<input
						value={userData.name}
						onChange={onChange}
						type='text'
						id='name'
						name='name'
						placeholder='User name'
					/>
				</div>
			)}
			<div>
				<label htmlFor='email'>Email:</label>
				<input
					value={userData.email}
					onChange={onChange}
					type='text'
					id='email'
					name='email'
					placeholder='Email'
				/>
			</div>

			<div>
				<label htmlFor='password'>Password:</label>
				<input
					value={userData.password}
					onChange={onChange}
					type='password'
					id='password'
					name='password'
					placeholder='Password'
				/>
			</div>
			<button>{formType}</button>
		</form>
	);
}
