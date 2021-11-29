import { IProduct } from './../services/services.i';
import { $axios } from '../utils/api';
import { GetterTree, ActionTree, MutationTree } from 'vuex'

export const state = () => ({
  isHelperMessageVisible: false as Boolean,
  products: [] as IProduct[],
  productsInBasket: [] as IProduct[]
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  products: state => state.products,
  productsInBasket: state => state.productsInBasket,
  isHelperMessageVisible: state => state.isHelperMessageVisible
}

export const mutations: MutationTree<RootState> = {
  SET_PRODUCTS: (state, newProducts) => (state.products = newProducts),
  SET_PRODUCT_INTO_BASKET: (state, newProduct) => {
    if (newProduct) {
      state.productsInBasket.push(newProduct)
    }
    else return
  },
  SET_HELPER_MESSAGE_STATUS: (state, helperMessageStatus) => {
    state.isHelperMessageVisible = helperMessageStatus
  }
}

export const actions: ActionTree<RootState, RootState> = {
  async fetchProducts({ commit }) {
    const products = await $axios.$get('https://fakestoreapi.com/products')
    commit('SET_PRODUCTS', products)
  },
  async fetchProductForBasket({ commit }, id: number) {
    const response = await $axios.$get(`https://fakestoreapi.com/products/${id}`)
    commit('SET_PRODUCT_INTO_BASKET', response)
  }
}