import deepClone from '@/utils/CloneUtils'

const mall = {
  state: {
    message: 0,
    materialClass: [],
    materia: [],
    isHome: true,
    materialAllClass: []

  },
  mutations: {
    SET_MESSAGE: (state, message) => {
      state.message = message
    },
    SET_MESSAGE_ADD: (state, materia) => {
      const materiaClone = deepClone(materia)
      let IsAdd = true
      state.materia.map(item => {
        if (item.id === materia.id) {
          IsAdd = false
          item.materialNum = item.materialNum + materia.materialNum
        }
        return item
      })

      if (IsAdd) {
        state.message++
        state.materia.push(materiaClone)
      }
    },
    SET_MESSAGE_MINUS: (state, materia) => {
      state.message--
      for (const item of state.materia) {
        if (item.id === materia.id) {
          const idx = state.materia.indexOf(item)
          if (idx !== -1) {
            state.materia.splice(idx, 1)
          }
        }
      }
    },
    SET_MESSAGE_CLEAR: (state) => {
      state.message = 0
      state.materia = []
    },
    SET_MATERIALCLASS: (state, materialClass) => {
      state.materialClass = materialClass
    },
    SET_MATERIALCLASS_ALL: (state, materialAllClass) => {
      state.materialAllClass = materialAllClass
    },
    SET_IS_HOME: (state, isHome) => {
      state.isHome = isHome
    }
  },
  getters: {
    getMessage: state => {
      return state.message
    },
    getMaterialClass: state => {
      return state.materialClass
    },
    getMaterialAllClass: state => {
      return state.materialAllClass
    },
    getMaterial: state => {
      return state.materia
    },
    getIsHome: state => {
      return state.isHome
    }

  },
  actions: {

  }
}

export default mall
