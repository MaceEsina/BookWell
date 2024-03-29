import Vuex from 'vuex'
import Vue from 'vue'

import partners from "@/assets/data/partners"
import { fixStr } from "@/helpers/strings"

Vue.use(Vuex)

export const store = new Vuex.Store({
  state () {
    return {
      lang: 'eng',
      user: null,
      partners,
      isLoading: true
    }
  },
  mutations: {
    changeLanguage (state) {
      state.lang = state.lang === 'eng' ? 'th' : 'eng'
    },
    setUser(state, user) {
      state.user = user
    },
    setLoading(state, isLoading) {
      state.isLoading = isLoading
    },
  },
  getters: {
    getReviews: (state) => (partnerId) => {
      const partner = state.partners.find(item => fixStr(partnerId) === fixStr(item.id))
      if (partner) return partner.reviews
      return []
    },
    getPartner: (state) => (partnerId) => {
      const partner = state.partners.find(item => fixStr(partnerId) === fixStr(item.id))
      return partner
    },
    getService: (state) => (serviceId, partnerId) => {
      const partner = state.partners.find(item => fixStr(partnerId) === fixStr(item.id))
      let result = null
      partner && partner.services.some(service => {
        if (fixStr(serviceId) === fixStr(service.id)) {
          const { location, email, phone, website, name } = partner
          result = {
            ...service,
            partnerId,
            location,
            website,
            phone,
            email,
            partnerName: name 
          }
          return true
        }
      })
      return result
    },
    getAllServices(state) {
      const result = []
      state.partners.forEach(partner => {
        const { services, id, location, email, phone, website, name } = partner
        services.forEach(service => {
          result.push({
            ...service,
            partnerId: id,
            email,
            phone,
            website,
            partnerName: name,
            location
          })
        })
      })
      return result
    },
    searchServices: (state) => (data) => {
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