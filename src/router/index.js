import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '../stores/user'
import Login from '../views/Login.vue'
import ApiCall from '../views/ApiCall.vue'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
		path: '/',
		name: 'login',
		component: Login
		},
		{
		path: '/home',
		name: 'home',
		component: ApiCall
		},
	]
})

router.beforeEach(async (to, from, next) => {
	const userStore = useUserStore()

	if(to.name === 'login' && userStore.token) {
		next({ name: 'home' })
	} else if (to.name === 'home' && !userStore.token) {
		next({ name: 'login' })
	} else {
		next()
	}
})

export default router
