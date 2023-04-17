import {ActionTree, GetterTree, MutationTree} from "vuex";
import configApi from "../config/api";

export interface State {
    statistics: [],
}

const baseUrl = configApi.getUrl();

export const state: State = {
    statistics: []
};


export const mutations: MutationTree<State> = {
    LOAD_STATISTICS: (state, payload) => state.statistics = payload
};
export const actions: ActionTree<State, State> = {
    async getStatistics(context): Promise<void>{
        const result = await fetch(`${baseUrl}/statistics`, {
            ...configApi.setGetHeaders()
        })
        if(result.ok) {
            const body = await result.json()
            context.commit('LOAD_STATISTICS', [body.data])
        }
    }
};
export const getters: GetterTree<State, State> = {
    getStatistics: (state) => state.statistics
};
