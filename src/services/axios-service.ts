import axios, { AxiosInstance } from "axios";

const axiosService: AxiosInstance = axios.create({
  baseURL: "https://apis.automittech.tech/",
  headers: {
    "Content-Type": "application/json",
  },
  // withCredentials: true,
});

// export const refreshToken = async () => {
// 	try {
// 		const details = {
// 			client_id: "Nick@Dev",
// 			client_secret: "P&sa4Nick#Ke",
// 			grant_type: "client_credentials",
// 		};
// 		const formBody = Object.entries(details)
// 			.map(
// 				([key, value]) =>
// 					`${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
// 			)
// 			.join("&");

// 		const reqOptions = {
// 			url: "https://www.automitventures.com/ussd/p_chama/index.php/token.php",
// 			method: "POST",
// 			headers: {
// 				"content-type": "application/x-www-form-urlencoded",
// 			},
// 			data: formBody,
// 		};

// 		const response = await axios(reqOptions);

// 		const newToken = response?.data.access_token;
// 		console.log("💊 Token", newToken);

// 		axiosService.defaults.headers.common.Authorization = `Bearer ${newToken}`;

// 		localStorage.setItem("token", newToken);

// 		return newToken;
// 	} catch (error) {
// 		console.log(error);
// 	}
// };

// axiosService.interceptors.request.use(
// 	async (config) => {
// 		const token = localStorage.getItem("token");
// 		console.log(token);
// 		if (token) {
// 			config.headers.Authorization = `Bearer ${token}`;
// 		}
// 		return config;
// 	},
// 	(error) => {
// 		return Promise.reject(error);
// 	},
// );

// // Add a response interceptor
// axiosService.interceptors.response.use(
// 	(response) => {
// 		return response;
// 	},
// 	async (error) => {
// 		const originalRequest = error.config;

// 		if (error.response.status === 401 && !originalRequest._retry) {
// 			originalRequest._retry = true;
// 			try {
// 				const newToken = await refreshToken();
// 				originalRequest.headers.Authorization = `Bearer ${newToken}`;
// 				return axiosService(originalRequest);
// 			} catch (error) {
// 				console.error("❗Token refresh error ❗");
// 			}
// 		}
// 		return Promise.reject(error);
// 	},
// );

export default axiosService;
