import type { createStorefrontClient } from '@shopify/hydrogen-react';
import type { GQL, extractGeneric, extractSecondGeneric } from './gql';

export async function request<T extends GQL>(
	gql: T,
	variables: extractSecondGeneric<T>,
	shopifyClient: ReturnType<typeof createStorefrontClient>,
	customFetch?: typeof fetch
): Promise<ShopifyReturn<extractGeneric<T>>> {
	const response = await (customFetch ?? fetch)(shopifyClient.getStorefrontApiUrl(), {
		body: JSON.stringify({
			query: gql.query,
			variables: variables ?? {}
		}),
		headers: shopifyClient.getPublicTokenHeaders(),
		method: 'POST'
	});
	if (!response.ok) {
		throw new Error(response.statusText);
	}
	return (await response.json()) as ShopifyReturn<extractGeneric<T>>;
}

export function requestPrefillShopifyClient(client: ReturnType<typeof createStorefrontClient>) {
	return async <T extends GQL>(gql: T, variables: extractSecondGeneric<T>) =>
		await request(gql, variables, client);
}
export interface ShopifyReturn<T = unknown> {
	data?: T;
	errors?: unknown[];
}
