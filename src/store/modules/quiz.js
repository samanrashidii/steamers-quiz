export default {
  namespaced: true,
  state: {
    step: 2,
    profile: {},
    username: null,
    questionStep: 1,
    totalQuestion: 4
  },
  getters: {
    quizData: state => state
  },
  mutations: {
    SET_PROFILE: (state, payload) => {
      state.profile = payload
    },
    SET_USERNAME: (state, payload) => {
      state.username = payload
    },
    SET_STEP: (state, payload) => {
      state.step = payload
    },
    SET_QUESTION_STEP: (state) => {
      if ((state.questionStep) === state.totalQuestion) {
        alert('Quiz Finished')
      } else {
        state.questionStep++
      }
    }
  },
  actions: {
    updateProfile: (context, payload) => {
      context.commit('SET_PROFILE', payload)
    },
    setUserName: (context, payload) => {
      context.commit('SET_USERNAME', payload)
    },
    setStep: (context, payload) => {
      context.commit('SET_STEP', payload)
    },
    setQuestionStep: (context) => {
      context.commit('SET_QUESTION_STEP')
    }
  }
}
