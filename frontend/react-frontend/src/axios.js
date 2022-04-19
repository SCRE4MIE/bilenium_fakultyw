import axios from 'axios'

// const baseURL = 'http://127.0.0.1:8000/api/';
const baseURL = 'http://192.168.0.19:8000/api/';

const instance = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  headers: {
    Authorization: sessionStorage.getItem('access')
        ? 'JWT ' + sessionStorage.getItem('access')
        : null,
        'Content-Type': 'application/json',
        accept: 'application/json',
  }
});

instance.interceptors.response.use(
	(response) => {
		return response;
	},
	async function (error) {
		const originalRequest = error.config;

		if (typeof error.response === 'undefined') {
			alert(
				'A server/network error occurred. ' +
					'Looks like CORS might be the problem. ' +
					'Sorry about this - we will get it fixed shortly.'
			);
			return Promise.reject(error);
		}

		if (
			error.response.status === 401 &&
			originalRequest.url === baseURL + 'token/refresh/'
		) {
			window.location.href = '/';
			return Promise.reject(error);
		}

		if (
			error.response.data.code === 'token_not_valid' &&
			error.response.status === 401 &&
			error.response.statusText === 'Unauthorized'
		) {
			const refreshToken = sessionStorage.getItem('refresh');

			if (refreshToken) {
				const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));

				// exp date in token is expressed in seconds, while now() returns milliseconds:
				const now = Math.ceil(Date.now() / 1000);
				console.log(tokenParts.exp);

				if (tokenParts.exp > now) {
					return instance
						.post('/token/refresh/', { refresh: refreshToken })
						.then((response) => {
							sessionStorage.setItem('access', response.data.access);
							sessionStorage.setItem('refresh', response.data.refresh);

							instance.defaults.headers['Authorization'] =
								'JWT ' + response.data.access;
							originalRequest.headers['Authorization'] =
								'JWT ' + response.data.access;

							return instance(originalRequest);
						})
						.catch((err) => {
							console.log(err);
						});
				} else {
					console.log('Refresh token is expired', tokenParts.exp, now);
					window.location.href = '/';
				}
			} else {
				console.log('Refresh token not available.');
				window.location.href = '/';
			}
		}

		// specific error handling done elsewhere
		return Promise.reject(error);
	}
);

export default instance;