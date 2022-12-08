import Vuex from 'vuex'
import Vue from 'vue'

import partners from "@/assets/data/partners"
import { fixStr} from "@/helpers/strings"

Vue.use(Vuex)

export const store = new Vuex.Store({
  state () {
    return {
      lang: 'eng',
      user: null,
      partners,
    }
  },
  mutations: {
    changeLanguage (state) {
      state.lang = state.lang === 'eng' ? 'th' : 'eng'
    },
    setUser(state, user) {
      state.user = user
    },
  },
  getters: {
    getService(state, serviceId, partnerId) {
      const partner = state.partners.find(item => parseInt(partnerId) === item.id)
      if (partner) {
        partner.services.find(item => parseInt(serviceId) === item.id)
      }
    },
    getAllServices(state) {
      const result = []
      state.partners.forEach(partner => {
        const { services, id, location } = partner
        services.forEach(service => {
          result.push({...service, partnerId: id, location })
        })
      })
      return result
    },
    searchServices(state, data) {
      const { search } = data
      const searchArr = search.split(' ').map(fixStr).filter(s => s)
      const result = []
      state.partners.forEach(partner => {
        const { services, id } = partner
        services.forEach(service => {
          const { name, tags } = service
          const nameLC = fixStr(name)
          const tagsLC = tags.map(fixStr)

          for (let i = 0; i < searchArr.length; i++) {
            const word = searchArr[i]
            if (nameLC.includes(word) || tagsLC.some(tag => tag.includes(word))) {
              result.push({...service, partnerId: id })
              break;
            }
          }
        })
      })
      return result
    }
  }
})