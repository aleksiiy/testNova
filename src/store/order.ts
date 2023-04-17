import {ActionTree, GetterTree, MutationTree} from "vuex";
import {INewOrder, IOrder} from "../interfaces/order";
import configApi from "../config/api";
import {toRaw} from "vue";

const DEFAULT_NEW_ORDER: INewOrder = JSON.parse(JSON.stringify({
    name: '',
    numberOfOrder: '',
    phone: '',
    address: ''
}))

export interface State {
    orders: IOrder[],
    updateOrder: IOrder
}

const baseUrl = configApi.getUrl();

export const state: State = {
    orders: [] as IOrder[],
    updateOrder: DEFAULT_NEW_ORDER as IOrder
};

export const mutations: MutationTree<State> = {
    LOAD_ORDERS: (state, payload) => {
        state.orders = payload
    },
    ADD_ORDER: (state, payload) => state.orders = [payload, ...state.orders],
    UPDATE_ORDER: (state, payload) => {
        state.orders = state.orders.filter(order => order.id !== payload.id)
        state.orders = [payload, ...state.orders]
    }
};
export const actions: ActionTree<State, State> = {
    async getAllOrders(context) {
        const result = await fetch(`${baseUrl}/orders`, {
            ...configApi.setGetHeaders()
        });

        if(result.ok){
            const body = await result.json();
            context.commit("LOAD_ORDERS", body.data);
        }
    },

    async createOrder(context, payload: INewOrder): Promise<void> {
        const result = await fetch(`${baseUrl}/orders`,{
            ...configApi.setPostHeaders(payload)
        });

        if (result.ok) {
            const body = await result.json()
            context.commit("ADD_ORDER", body.data);
        }
    },

    async updateOrder(context, {id, payload}): Promise<void> {
        const result = await fetch(`${baseUrl}/orders/${id}`, {
            ...configApi.setPatchHeaders(payload)
        })

        if (result.ok) {
            const body = await result.json()
            context.commit("UPDATE_ORDER", body.data);
        }
    }
};
export const getters: GetterTree<State, State> = {
    getOrders: (state) => state.orders,
    showOrder: (state) => (id: string) => toRaw(state.orders).filter((order: IOrder) => order.id === id),
    defaultNewOrder: () => DEFAULT_NEW_ORDER
};
