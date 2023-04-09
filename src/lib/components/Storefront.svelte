<script lang="ts">
	import { createStorefrontClient } from '@shopify/hydrogen-react';

	import { hasContext, setContext } from 'svelte';
	import { request } from 'sveltefront/helpers/request';

	export let storeDomain: string;
	export let publicStorefrontToken: string;
	const storefrontApiVersion = '2023-01';

	if (hasContext('sveltefront')) {
		throw new Error(
			'Sveltefront is already initalized in this context. You can not have child Sveltefront Storefront components.'
		);
	}

	const client = createStorefrontClient({
		storeDomain,
		publicStorefrontToken,
		storefrontApiVersion
	});

	const sveltefront = {
		request: async <T = any>(gql: string) => await request<T>(gql, client)
	};

	setContext('sveltefront', sveltefront);
</script>

<slot {sveltefront} />
