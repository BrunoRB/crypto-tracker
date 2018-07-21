<template>
	<div id="products">
		<h1>Welcome to yet another Crypto Tracker 😃</h1>

		<div id="select">
			<pulse-loader :loading="loading"></pulse-loader>
			<v-select v-if="!loading" :options="options"
				:on-change="onChange" v-model="selected">
			</v-select>
		</div>

		<div id="prices">
			<clip-loader :loading="loadingProd"></clip-loader>
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
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import ClipLoader from 'vue-spinner/src/ClipLoader.vue'
import CONFS from '../../../src/modules/confs.js'

const URL = CONFS.SERVER_HOST + ':' + CONFS.SERVER_PORT;

export default {
  	name: 'Products',
    components: {
		PulseLoader,
		ClipLoader
	},
	props: {},
	data: () => {
		return {
			options: [],
			selected: null,
			products: [],
			errors: [],
			loading: true,
			loadingProd: false
		};
	},

	mounted() {
		this.errors = [];

		let p = Promise.resolve();
		if (this.$route.params.options) {
			this.options = this.$route.params.options;
			this.loading = false;
		}
		else {
			p = this.getAll();
		}

		if (!this.$route.params.product) {
			this.products = [];
		}
		else {
			this.selected = this.$route.params.product;
			p.then(() => {
				this.getProduct(this.$route.params.product);
			});
		}
	},

	methods: {

		getAll() {
			this.loading = true;
			return axios.get(`${URL}/api/products`).then(response => {
				this.loading = false;
				this.options = response.data;
			}).catch(e => {
				this.loading = false;
				this.errors.push('Failed trying to fetch the product list');
				console.error(e)
				return Promise.reject(e);
			});
		},

		getProduct(prod) {
			this.loadingProd = true;
			return axios.get(`${URL}/api/products/${prod}/prices`).then(response => {
				this.loadingProd = false;
				this.products = response.data;
			}).catch(e => {
				this.loadingProd = false;
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
				this.$router.push({
					name: 'Products',
					params: {
						options: this.options
					}
				});
			}
		}
	}
}
</script>
<style scoped>

#select {
	margin-bottom: 2%;
}

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