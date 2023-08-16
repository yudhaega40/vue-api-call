<template>
    <TopNav/>
    <div class="w-screen h-full min-h-screen bg-white p-6">
        <!-- sm or more, api link input --> 
        <div class="rounded-md sm:flex flex-col hidden">
            <div class="flex">
                <Listbox as="div" v-model="selectedRequestType">
                    <ListboxButton class="inline-flex w-24 justify-between items-center rounded-l-md border border-r-0 border-gray-300 bg-white pl-3 pr-1 py-3 text-gray-500 text-xs sm:text-sm md:text-md lg:text-lg">
                        {{ selectedRequestType.name }}
                        <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true"/>
                    </ListboxButton >
                    <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
                        <ListboxOptions class="absolute z-10 mt-1 max-h-60 w-fit overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            <ListboxOption as="template" v-for="req in requestType" :key="req.name" :value="req" v-slot="{ active, selected }">
                                <li :class="[active ? 'bg-red-600 text-white' : 'text-gray-900', 'relative cursor-default select-none py-2 pl-3 pr-9']">
                                    <span :class="[selected ? 'font-semibold' : 'font-normal', 'block truncate']">{{ req.name }}</span>

                                    <span v-if="selected" :class="[active ? 'text-white' : 'text-red-600', 'absolute inset-y-0 right-0 flex items-center pr-4']">
                                        <CheckIcon class="h-5 w-5" aria-hidden="true" />
                                    </span>
                                </li>
                            </ListboxOption>
                        </ListboxOptions>
                    </transition>
                </Listbox>

                <input v-model="apiUrl" type="text" class="block w-full min-w-0 flex-1 rounded-none border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 text-xs sm:text-sm md:text-md lg:text-lg sm:leading-6"/>
                
                <button v-if="loadingApi" class="w-24 inline-flex justify-center items-center rounded-r-md border border-l-0 border-gray-300 bg-white px-3">
                    <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-red-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                </button>
                <button v-else class="w-24 inline-flex justify-center items-center rounded-r-md border border-l-0 border-gray-300 bg-white px-3" @click="call">
                    <PaperAirplaneIcon class="h-8 w-8 text-gray-500"/>
                </button>
            </div>

            <div class="relative mt-6" v-if="selectedRequestType.value == 'post' || selectedRequestType.value == 'put'">
				<label class="absolute -top-3 left-2 inline-block bg-white px-1 text-md font-medium text-gray-900">Body/Raw/Json</label>
				<textarea rows="5" type="text" v-model="jsonData" class="block w-full rounded-md border-0 pb-1.5 pt-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6" placeholder="your api data" />
			</div>
        </div>

        <!-- smaller than sm, api link input -->
        <div class="rounded-md sm:hidden flex flex-col">
            <Listbox as="div" v-model="selectedRequestType">
                <ListboxButton class="inline-flex w-full justify-between items-center border border-gray-300 border-b-0 bg-white pl-3 pr-1 py-1 rounded-t-md">
                    {{ selectedRequestType.name }}
                    <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true"/>
                </ListboxButton>
                <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
                    <ListboxOptions class="absolute z-10 mt-1 max-h-60 w-fit overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        <ListboxOption as="template" v-for="req in requestType" :key="req.name" :value="req" v-slot="{ active, selected }">
                            <li :class="[active ? 'bg-red-600 text-white' : 'text-gray-900', 'relative cursor-default select-none py-2 pl-3 pr-9']">
                                <span :class="[selected ? 'font-semibold' : 'font-normal', 'block truncate']">{{ req.name }}</span>

                                <span v-if="selected" :class="[active ? 'text-white' : 'text-red-600', 'absolute inset-y-0 right-0 flex items-center pr-4']">
                                    <CheckIcon class="h-5 w-5" aria-hidden="true" />
                                </span>
                            </li>
                        </ListboxOption>
                    </ListboxOptions>
                </transition>
            </Listbox>
            
            <textarea v-model="apiUrl" rows="3" type="text" class="block w-full min-w-0 flex-1 rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"/>
            
            <div class="flex justify-end mt-2">
                <button v-if="loadingApi" class="w-24 flex items-center justify-center rounded-md border border-gray-300 bg-white px-6 py-1">
                    <svg aria-hidden="true" class="w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-red-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                </button> 
                <button v-else class="w-24 flex items-center justify-center rounded-md border border-gray-300 bg-white px-6 py-1" @click="call">
                    <PaperAirplaneIcon class="h-6 w-6 text-gray-500"/>
                </button>
            </div>

            <div class="relative mt-2" v-if="selectedRequestType.value == 'post' || selectedRequestType.value == 'put'">
				<label class="absolute -top-3 left-2 inline-block bg-white px-1 text-md font-medium text-gray-900">Body/Raw/Json</label>
				<textarea rows="5" type="text" v-model="jsonData" class="block w-full rounded-md border-0 pb-1.5 pt-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6" placeholder="your api data" />
			</div>
        </div>

        <div class="relative">
            <label class="absolute -top-3 left-2 inline-block bg-white px-1 text-md font-medium text-gray-900">Result</label>
            <div class="bg-white border border-gray-300 rounded-md mt-6 min-h-[80vh] h-full p-6 overflow-auto">
                <pre v-if="result">{{ result }}</pre>
                <pre v-if="errors" class="text-red-500">{{ errors }}</pre>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue'
    import axios from 'axios'
    import { useUserStore } from '../stores/user'
    import { PaperAirplaneIcon } from '@heroicons/vue/24/outline';
    import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
    import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/vue'
    import TopNav from '../components/TopNav.vue'

    const userStore = useUserStore()

    let apiUrl = ref(null)
    let jsonData = ref(null) 

    let result = ref(null)
    let errors = ref(null)

    let loadingApi = ref(false)

    const requestType = [
        { name: 'Get', value: 'get' },
        { name: 'Post', value: 'post' },
        { name: 'Put', value: 'put' },
        { name: 'Delete', value: 'delete' },
    ]

    const selectedRequestType = ref(requestType[0])

    onMounted(async() => {
        apiUrl.value = userStore.api || null
    })

    const call = async() => {
        loadingApi.value = true

        result.value = null
        errors.value = null

		try {
            if (selectedRequestType.value.value == 'get') {
                let res = await axios.get(apiUrl.value)
                result.value = res
            } else if (selectedRequestType.value.value == 'post') {
                let res = await axios.post(apiUrl.value, JSON.parse(jsonData.value))
                result.value = res
            } else if (selectedRequestType.value.value == 'put') {
                let res = await axios.put(apiUrl.value, JSON.parse(jsonData.value))
                result.value = res
            } else if (selectedRequestType.value.value == 'delete') {
                let res = await axios.delete(apiUrl.value)
                result.value = res
            }
		} catch (err) {
			errors.value = err.response
		}

        loadingApi.value = false
    }
</script>