<template>
	<div id="products">
		<h1>Welcome to yet another Crypto Tracker 😃</h1>

		<v-select :options="options"
			:on-change="onChange" v-model="selected">
		</v-select>

		<div v-if="products && Object.keys(products).length">
			<div v-for="product of products" v-bind:key="product.exchange"
				class="card" :class="{
					'lower': product.isLower,
					'higher': product.isHigher
				}">

				<div class="container">
					<p><strong>{{product.exchange}}</strong></p>
					<p class="price"><em>{{product.price}}</em></p>
				</div>
			</div>
		</div>

		<ul id="errors" v-if="errors && errors.length">
			<li v-for="err in errors" v-bind:key="err">
				{{err}}
			</li>
		</ul>
	</div>
</template>

<script>

import axios from 'axios';

export default {
  name: 'Products',
	props: {},
	data: () => {
		return {
			options: [],
			selected: null,
			products: [],
			errors: []
		};
	},

	mounted() {
		this.errors = [];

		if (this.$route.params.options) {
			this.options = this.$route.params.options;
		}
		else {
			this.getAll('', () => {});
		}

		if (!this.$route.params.product) {
			this.products = [];
		}
		else {
			this.selected = this.$route.params.product;
			this.getProduct(this.$route.params.product);
		}
	},

	methods: {
		getAll(search, loading) {
			loading(true);
			axios.get(`http://localhost:8081/api/products`).then(response => {
				this.options = response.data;
				loading(false);
			}).catch(e => {
				this.errors.push(e.statusText);
				loading(false);
			});
		},

		getProduct(prod) {
			axios.get(`http://localhost:8081/api/products/${prod}/prices`).then(response => {
				this.products = response.data;
			}).catch(e => {
				console.error(e)
				this.errors.push(`${prod} fetch failed`);
			});
		},

		onChange(val) {
			if (val) {
				this.$router.push({
					name: 'Product',
					params: {
						product: val,
						options: this.options
					}
				});
			}
			else {

			}
		}
	}
}
</script>
<style scoped>
.card {
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
	width: 30%;
	display: inline-block;
	font-size: x-large;
	margin: 1%;
}

@media screen and (max-width: 768px) {
	.card {
		width: 100%;
	}
}

.higher .price {
	color: green;
}
.lower .price {
	color: red;
}

.card:hover {
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}
</style>