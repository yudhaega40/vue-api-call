<template>
  	<div class="flex flex-col gap-4 justify-center items-center h-screen w-screen bg-gray-100">
		<div class="w-96 h-auto border border-2 border-gray-400 shadow-xl rounded-xl p-4 space-y-6 bg-white">
			<p class="text-center block text-lg font-medium leading-6 text-gray-900">Login</p>

			<div class="relative">
				<label class="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900">Email</label>
				<input type="email" v-model="email" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6" placeholder="you@example.com" />
			</div>

			<div class="relative">
				<label class="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900">Password</label>
				<input type="password" v-model="password" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6" placeholder="your password" />
			</div>

			<div>
				<ApiSelection v-model="selectedApi"/>
			</div>

			<div>
				<button 
					type="button" 
					:disabled = "!(selectedApi && email && password)"
					:class = "[ selectedApi && email && password ? 'cursor-pointer' : 'opacity-50 cursor-not-allowed',
						'w-full rounded bg-red-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600'
						]"
					@click="login"
				>
					LOGIN
				</button>
			</div>
		</div>

		<div v-if="errors" class="border border-red-500 text-red-500 bg-red-200 p-2 max-w-screen max-h-64 overflow-auto">
			<pre>{{ errors }}</pre>
		</div>
	</div>
</template>

<script setup>
	import { ref } from 'vue'
	import axios from 'axios'
	import { useRouter } from 'vue-router'
	import { useUserStore } from '../stores/user'
	import ApiSelection from '../components/ApiSelection.vue'

	const userStore = useUserStore()
	const router = useRouter()

	let email = ref(null)
	let password = ref(null)
	let selectedApi = ref(null)

	let errors = ref(null)

	const login = async () => {
		errors.value = null
		try {
			let res = await axios.post(selectedApi.value.url+'login', {
				email: email.value,
				password: password.value,
			})

			axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.data.token

			userStore.setUserDetail([res, selectedApi.value.url])

			router.push('/home')
		} catch (err) {
			errors.value = err.response
		}
	}

</script>
