import VueRouter from 'vue-router';
import Vue from 'vue'
import ListPage from './components/ListPage.vue';
import NotFoundPage from './components/NotFoundPage.vue';

let routes = [
	{
		path: '/', redirect: '/products'
	},
	{
		path: '/products', name: 'Products', component: ListPage,
		meta: {}
	},
	{
		path: '/product/:product/prices', name: 'Product', component: ListPage,
		meta: {}
	},
	// catch all redirect
	{
		path: '*', component: NotFoundPage,
		meta: {
			unauthorized: true
		}
	}
];

const router = new VueRouter({
	base: '',
	mode: 'history',
	routes
});

Vue.use(VueRouter);

export default router;