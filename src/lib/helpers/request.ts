import type { createStorefrontClient } from '@shopify/hydrogen-react';

export async function request<T = any>(
	gql: string,
	shopifyClient: ReturnType<typeof createStorefrontClient>,
	customFetch?: typeof fetch
): Promise<{ data: T; errors?: any[] }> {
	const response = await (customFetch ?? fetch)(shopifyClient.getStorefrontApiUrl(), {
		body: JSON.stringify({
			query: gql
		}),
		headers: shopifyClient.getPublicTokenHeaders(),
		method: 'POST'
	});
	if (!response.ok) {
		throw new Error(response.statusText);
	}
	return await response.json();
}
