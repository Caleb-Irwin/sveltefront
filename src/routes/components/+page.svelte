<script lang="ts">
	import { Storefront } from 'sveltefront';
	import { PUBLIC_STORE_DOMAIN, PUBLIC_PUBLIC_STOREFRONT_TOKEN } from '$env/static/public';
	import { browser } from '$app/environment';
	import { gql } from 'sveltefront/helpers/gql';
	const shopName = gql<{ shop: { name: string } }>`
		{
			shop {
				name
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
			<p>
				{#await sveltefront.request(shopName)}
					Loading...
				{:then value}
					Shop Name: {value.data?.shop?.name}
				{:catch error}
					{JSON.stringify(error)}
				{/await}
			</p>
		{/if}
	</div>
</Storefront>
