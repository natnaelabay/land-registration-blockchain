import contract from 'truffle-contract'
import LandContract from '../assets/Land.json'

const BChain = {
    namespaced: true,

    state: {
        instance: null,
        contract: null,
        lands: [],
        myLands: [],
        isLoading: false,
        users: [],
        all_transactions: [],
        my_transactions: [],
        isLoggedIn: localStorage.getItem("logged_in") ? true : false,
        isAdmin: localStorage.getItem("is_admin") ? true : false,
        profile: localStorage.getItem("profile"),
    },
    mutations: {
        SET_IS_LOADING(state, data) {
            state.isLoading = data;
        },
        SET_INSTANCE(state, data) {
            state.instance = data;
        },
        SET_ALL_TRANSACTIONS(state, transactions) {
            state.all_transactions = transactions;
        },
        SAVE_ALL_USERS(state, users) {
            state.users = users;
        },
        SET_CONTRACT(state, data) {
            state.contract = data;
        },
        SET_ALL_LANDS(state, data) {
            state.lands = data;
        },
        SET_MY_LANDS(state, data) {
            state.myLands = data;
        },
        SET_MY_TRANSACTIONS(state, transaction) {
            state.my_transactions = transaction;
        },
        SET_LOGGED_IN(state, status) {
            localStorage.setItem("logged_in", status)
            state.isLoggedIn = status;
        },
        SET_IS_ADMIN(state, isAdmin) {
            localStorage.setItem("is_admin", isAdmin)
            state.isAdmin = isAdmin;
        },
        SET_PROFILE(state, data) {
            localStorage.setItem("profile", data)
            state.profile = data;
        }
    },
    actions: {
        init({ commit, state }) {
            return new Promise(function (resolve, reject) {
                commit("SET_CONTRACT", contract(LandContract))
                state.contract.setProvider(window.web3.currentProvider)
                state.contract.deployed().then(instance => {
                    self.instance = instance
                    commit("SET_INSTANCE", self.instance)
                    window.aa = self.instance;
                    resolve()
                }).catch(err => {
                    reject(err)
                })
            })
        },
        setIsLoading({ commit }, data) {
            commit("SET_IS_LOADING", data)
        },
        async getLands({ commit, state }) {
            commit("SET_IS_LOADING", true)
            const data = await state.instance.getLands();
            commit("SET_ALL_LANDS", data);
            commit("SET_IS_LOADING", false);
        },
        async attemptLogin({ commit, state }, data) {

            commit("SET_IS_LOADING", true)
            await ethereum.enable();
            const accounts = await ethereum.request({
                method: "eth_requestAccounts",
            });
            const account = accounts[0];
            let status = await state.instance.login.call(data.id, data.password, { from: account })
            commit("SET_LOGGED_IN", status)
            state.instance.getMe(account).then((res) => {
                commit("SET_IS_LOADING", false)
                commit("SET_IS_ADMIN", res.isAdmin)
                commit("SET_PROFILE", res)
                console.log("res.isAdmin")
                console.log(status && res.isAdmin)
                console.log("res.isAdmin")
                if (status && res.isAdmin) {
                    data.router.push("/admin")
                } else if (status) {
                    data.router.push("/profile")
                }
                return res.isAdmin
            }
            )
            commit("SET_IS_LOADING", false)
        },

        async attemptRegister({ commit, state }, form) {
            commit("SET_IS_LOADING", true)
            // const account = await web3.eth.getAccounts();
            await ethereum.enable();
            const accounts = await ethereum.request({
                method: "eth_requestAccounts",
            });
            const account = accounts[0];

            const status = await state.instance.register(
                form.f_name,
                form.l_name,
                form.id,
                form.password,
                false,
                { from: account }
            );

            commit("SET_IS_LOADING", false)
            console.log("this is the status attempt register" + status)
        },
        async getLandsWithOwnerDetail({ commit, state }) {
            commit("SET_IS_LOADING", true)
            let addresses = await state.instance.getAllAddresses();
            let users = [];
            for (let i = 0; i < addresses.length; i++) {
                users.push(await state.instance.user(addresses[i]))
            }
            commit("SAVE_ALL_USERS", JSON.parse(JSON.stringify(users)))
            commit("SET_IS_LOADING", false)
        },
        async getMyLands({ commit, state }) {
            commit("SET_IS_LOADING", true)
            await ethereum.enable();
            const accounts = await ethereum.request({
                method: "eth_requestAccounts",
            });
            const account = accounts[0];
            commit("SET_MY_LANDS",
                JSON.parse(JSON.stringify((await state.instance.getUserLands({ from: account })))))
            commit("SET_IS_LOADING", false)

        },
        async getAllTransactions({ commit, state }) {
            commit("SET_IS_LOADING", true)

            let address = ethereum.selectedAddress;
            commit("SET_ALL_TRANSACTIONS",
                JSON.parse(JSON.stringify((await state.instance.getAllTransactions()))))
            commit("SET_IS_LOADING", false)
        },

        async getMyTransactions({ commit, state }) {
            commit("SET_IS_LOADING", true)
            await ethereum.enable();
            const accounts = await ethereum.request({
                method: "eth_requestAccounts",
            });
            const account = accounts[0];

            let address = ethereum.selectedAddress;
            commit("SET_MY_TRANSACTIONS",
                JSON.parse(JSON.stringify((
                    await state.instance.getTransactions({
                        from: account
                    })))))
            commit("SET_IS_LOADING", false)
        },

        // async getLand({ commit, state }) {

        // }
    },
    getters: {},
}


export default BChain;