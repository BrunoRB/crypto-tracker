<template>
	<div id="products">
		<h1>Welcome to yet another Crypto Tracker 😃</h1>
		<v-select label="name" :filterable="false" :options="options" @search="onSearch">
			<template slot="no-options">
				type to search GitHub repositories..
			</template>
			<template slot="option" slot-scope="option">
				<div class="d-center">
				<img :src='option.owner.avatar_url'/>
				{{ option.full_name }}
				</div>
			</template>
			<template slot="selected-option" slot-scope="option">
				<div class="selected d-center">
				<img :src='option.owner.avatar_url'/>
				{{ option.full_name }}
				</div>
			</template>
		</v-select>

		<ul v-if="posts && posts.length">
			<li v-for="post of posts" v-bind:key="post.svn_url">
				<p><strong>{{post.svn_url}}</strong></p>
			</li>
		</ul>
	</div>

</template>

<script>

import axios from 'axios';

let _t = null;
let _lock = false;
export default {
  name: 'Products',
	props: {},
	data: () => {
		return {
			posts: [],
			options: []
		};
	},
	methods: {
		onSearch(search, loading) {
			if (!_t) {
				this.search(search, loading);
			}
			else {
				window.clearTimeout(_t);
				_t = setTimeout(() => {
					this.search(search, loading);
				}, 350);
			}
		},

		search(search, loading) {
			if (_lock) {
				return;
			}

			loading(true);
			_lock = true;
			axios.get(`https://api.github.com/search/repositories?q=${escape(search)}`)
			.then(response => {
				console.log(response.data.items);
				this.posts = response.data.items;
				_lock = false;
				loading(false);
			}).catch(e => {
				alert(e); // TODO
				_lock = false;
				loading(false);
			});
		}
	}
}
</script>
<style scoped>
</style>