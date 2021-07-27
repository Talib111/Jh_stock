import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const SignIn = ({ setIsAuthenticated }) => {
	const [email, setEmail] = useState(null);
	const [password, setPassword] = useState(null);
	const router = useHistory();
	const handleSubmit = async (e) => {
		e.preventDefault();
		const { data } = await axios.post('http://localhost:3000/admin/signin', {
			email,
			password,
		});
		console.log(data);
		if (data.error) return alert(data.message);

		await localStorage.setItem('@auth_token', JSON.stringify(data.payload));
		//this is to hide and show content according to admin or user
		await localStorage.setItem('@type_user', JSON.stringify(email));
		axios.defaults.headers.common['Authorization'] = `Bearer ${data.payload}`;
		setIsAuthenticated(true);
		router.push('/');
	};
	return (
		<div className='container'>
			<div className='row mt-5'>
				<div className='col-md-6 offset-0 offset-lg-3'>
					<div className='card '>
						<div className='card-header'>Admin Signin</div>
						<form onSubmit={handleSubmit} className='card-body'>
							<div class='form-group'>
								<label for='exampleInputEmail1'>Email address</label>
								<input
									type='email'
									class='form-control'
									id='exampleInputEmail1'
									aria-describedby='emailHelp'
									placeholder='Enter email'
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
								
							</div>
							<div class='form-group mt-3'>
								<label for='exampleInputPassword1'>Password</label>
								<input
									type='password'
									class='form-control'
									id='exampleInputPassword1'
									placeholder='Password'
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
							</div>
							
							<button type='submit' class='btn btn-primary mt-4'>
								Submit
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SignIn;
