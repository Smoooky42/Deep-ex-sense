import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { BaseQueryFn, FetchArgs, FetchBaseQueryError} from '@reduxjs/toolkit/query';


const baseQuery = fetchBaseQuery({
	baseUrl: process.env.SERVER_URL,
	credentials: 'include',
	prepareHeaders: (headers, { getState }) => {
		const accessToken = localStorage.getItem("accessToken")

		if (accessToken) {
			headers.set("authorization", `Bearer ${accessToken}`)
		}
		return headers
	}
})

// const baseQueryWithRetry = retry(baseQuery, { maxRetries: 0 })

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
	args: any,
	api,
	extraOptions
) => {
	let result = await baseQuery(args, api, extraOptions);

	if (result.error && result.error.status === 401 && !args._isRetry) {
		args._isRetry = true;
		// Попытка обновить токен
		const refreshResult: any = await baseQuery('/refresh', api, extraOptions);

		if (refreshResult.data) {
			// Сохраните новый токен
			localStorage.setItem('accessToken', refreshResult.data.accessToken);
			// Повторите оригинальный запрос
			result = await baseQuery(args, api, extraOptions);
		} else {
			// Если обновление токена не удалось
			console.log('ВЫ НЕ АВТОРИЗОВАНЫ');
		}

		if (refreshResult.error) {
			console.log('Обновление токена не удалось. Выполняется выход из системы...');
			localStorage.removeItem('accessToken');
			window.location.href = '/auth'; // Перенаправление на страницу авторизации
		}

	}

	return result;
};


export const api = createApi({
	reducerPath: "Api",
	baseQuery: baseQueryWithReauth,
	refetchOnMountOrArgChange: false,
	endpoints: () => ({})
})
