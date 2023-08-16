<template>
    <Disclosure as="nav" class="bg-red-900" v-slot="{ open }">
        <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div class="relative flex h-16 items-center justify-between">
                <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
                    <!-- Mobile menu button-->
                    <DisclosureButton
                        class="relative inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-red-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                        <span class="absolute -inset-0.5" />
                        <span class="sr-only">Open main menu</span>
                        <Bars3Icon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
                        <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
                    </DisclosureButton>
                </div>
                <div class="hidden sm:flex sm:ml-6 flex-1 items-center sm:items-stretch sm:justify-between">
                    <div class="flex space-x-4">
                        <a v-for="item in navigation" :key="item.name" :href="item.href" class="text-white hover:bg-red-800 hover:text-white rounded-md px-3 py-2 text-sm font-medium">
                            {{ item.name }}
                        </a>
                    </div>

                    <button @click="logout" class="text-white hover:bg-red-800 hover:text-white rounded-md px-3 py-2 text-sm font-medium">
                        Log out
                    </button>
                </div>
            </div>
        </div>

        <DisclosurePanel class="sm:hidden">
            <div class="space-y-1 px-2 pb-3 pt-2">
                <DisclosureButton v-for="item in navigation" :key="item.name" as="a" :href="item.href" class="w-full text-left text-white hover:bg-red-800 hover:text-white block rounded-md px-3 py-2 text-base font-medium">
                    {{ item.name }}
                </DisclosureButton>
                <DisclosureButton @click="logout" class="w-full text-left text-white hover:bg-red-800 hover:text-white block rounded-md px-3 py-2 text-base font-medium">
                    Log out
                </DisclosureButton>
            </div>
        </DisclosurePanel>
    </Disclosure>
</template>
  
<script setup>
    import { ref, onMounted } from 'vue'
    import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
    import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'
    import { useUserStore } from '../stores/user'
    import { useRouter } from 'vue-router'
    import axios from 'axios'
    import Swal from 'sweetalert2';

    let apiUrl = ref(null)
    const userStore = useUserStore()
    const router = useRouter()
    const navigation = [
        //{ name: 'Dashboard', href: '#'},
    ]

    onMounted(async() => {
        apiUrl.value = userStore.api || null
    })

    const logout = async () => {
        Swal.fire({
            title: 'Are you sure you want to log out?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#00437d',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, log out!'
        }).then((result) => {
            if (result.isConfirmed) {
                try {
                    let res = axios.post(apiUrl.value + 'logout')
                    userStore.clearUser()
                    router.push('/')
                } catch (err) {
                    console.log(err)
                }
            }
        })
    }
</script>
  