import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
    state: () => ({
        id: null,
        token: null,
        api: null,
    }),

    actions: {
        setUserDetail(data) { //data[0] = api login result, data[1] = api url
            let res = data[0]

            this.$state.id = res.data.data.id
            this.$state.token = res.data.data.token
            this.$state.api = data[1]
        },

        clearUser() {
            this.$state.id = null
            this.$state.token = null
            this.$state.api = null
        }
    },

    persist: true
})