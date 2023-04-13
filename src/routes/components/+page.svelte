<script lang="ts">
	import type { Product } from '@shopify/hydrogen-react/storefront-api-types';

	import { Storefront } from 'sveltefront';
	import { PUBLIC_STORE_DOMAIN, PUBLIC_PUBLIC_STOREFRONT_TOKEN } from '$env/static/public';
	import { browser } from '$app/environment';
	import { gql } from 'sveltefront/helpers/gql';

	const shopName = gql<{ products: { nodes: Partial<Product>[] } }>`
		query test($limit: Int = 5) {
			products(first: $limit) {
				nodes {
					handle
					title
					id
				}
			}
		}
	`;
</script>

<Storefront
	storeDomain={PUBLIC_STORE_DOMAIN}
	publicStorefrontToken={PUBLIC_PUBLIC_STOREFRONT_TOKEN}
	let:sveltefront
>
	<div class="">
		<h1>Storefront Component</h1>
		{#if browser}
			{#await sveltefront.request(shopName, { limit: 20 })}
				<p>Loading...</p>
			{:then value}
				<ul>
					{#each value.data?.products.nodes ?? [] as product}
						<li>{product.handle} ({product.id}): {product.title} <br /></li>{/each}
				</ul>
			{:catch error}
				<p>{JSON.stringify(error)}</p>
			{/await}
		{/if}
	</div>
</Storefront>
