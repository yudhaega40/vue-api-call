<template>
    <Listbox as="div" v-model="selected" class="relative">
        <ListboxLabel class="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900">APIs</ListboxLabel>
        <div class="">
            <ListboxButton class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6">
                <template v-if="selected">
                    <span class="flex w-full truncate pl-3 pr-6">
                        <span class="">{{ selected.name }}</span>
                        <span class="ml-2 truncate text-gray-500">{{ selected.url }}</span>
                    </span>
                    <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </span>
                </template>
                <template v-else>
                    <span class="flex w-full truncate pl-3 pr-6">
                        Please Select an API
                    </span>
                    <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </span>
                </template>
                
            </ListboxButton>

            <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
                <ListboxOptions class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    <ListboxOption as="template" v-for="api in apis" :key="api.url" :value="api" v-slot="{ active, selected }">
                        <li :class="[active ? 'bg-indigo-600 text-white' : 'text-gray-900', 'relative cursor-default select-none py-2 pl-3 pr-9']">
                            <div class="flex">
                                <span :class="[selected ? 'font-semibold' : 'font-normal', 'truncate']">{{ api.name }}</span>
                                <span :class="[active ? 'text-indigo-200' : 'text-gray-500', 'ml-2 truncate']">{{ api.url }}</span>
                            </div>

                            <span v-if="selected" :class="[active ? 'text-white' : 'text-indigo-600', 'absolute inset-y-0 right-0 flex items-center pr-4']">
                                <CheckIcon class="h-5 w-5" aria-hidden="true" />
                            </span>
                        </li>
                    </ListboxOption>
                </ListboxOptions>
            </transition>
        </div>
    </Listbox>
</template>

<script setup>
    import { ref, watch, defineEmits, onMounted } from 'vue'
    import { Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions } from '@headlessui/vue'
    import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'

    const apis = [
        { name: 'Inventory', url: 'http://solopos-inventory-be.test/api/v1/' },
        { name: 'Simple CMS', url: 'http://spos_miniproject.test/api/v1/' },
    ]

    const selected = ref(null)

    const emit = defineEmits();

    watch(selected, newValue => {
        emit('update:selected', newValue);
    });

    onMounted(() => {
        emit('update:selected', selected.value);
    });

</script>