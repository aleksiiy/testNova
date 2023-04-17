import {createStore} from 'vuex'

import * as order from "./order";
import * as statistics from "./statistics";

const PROCESS_STATUS = {
  accepted: "accepted",
  in_progress: "in_progress",
  canceled: "canceled",
  postponed: "postponed"
}

interface GStore extends
    order.State,
    statistics.State {
  loaderStatus: boolean
}

export default createStore<GStore>({
  state: {
    ...order.state,
    ...statistics.state,
    loaderStatus: false
  },
  getters: {
    getProcessStatus: () => Object.freeze(PROCESS_STATUS),
    getStatusLoader: (state) => state.loaderStatus
  },
  mutations: {
    SET_LOADER: (state, payload: boolean) => {
      state.loaderStatus = payload
    }
  },
  modules: {
    order: {
      namespaced: true,
      ...order,
    },
    statistic: {
      namespaced: true,
      ...statistics
    },
  }
})
