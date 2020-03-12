import tim from '../../tim'
const user = {
  state: {
    currentUserProfile: {},
    isLogin: false,
    isSDKReady: false // TIM SDK 是否 ready
  },
  mutations: {
    updateCurrentUserProfile(state, userProfile) {
      state.currentUserProfile = userProfile
    },
    toggleIsLogin(state, isLogin) {
      state.isLogin = typeof isLogin === 'undefined' ? !state.isLogin : isLogin
    },
    toggleIsSDKReady(state, isSDKReady) {
      state.isSDKReady = typeof isSDKReady === 'undefined' ? !state.isSDKReady : isSDKReady
    },
    reset(state) {
      Object.assign(state, {
        currentUserProfile: {},
        isLogin: false,
        isSDKReady: false // TIM SDK 是否 ready
      })
    }
  },
  actions: {
    login(context, userID) {
      tim
        .login({
          userID,
          userSig: 'eJxNjVFPgzAURv9LXzHaUroU3zqcjmWCZLAFY0IqlFG1wFjZhsb-bkMw*nrOPd-9AvF6c83zvOlrnemhFeAWQHA1YlmIWstSis5APEMU08nwtpVFxnWGu*JfcCzes1EZhhwIoY0hdScpLq3sRMZLPe4hQohtTiZ7Et1RNrURNkQEmRD*SS2VGBOKXeogZP-*k3uDHxep50eep6yD3jhR4Fe2mOn5vSJBpZkVdjBJh3lI*ueHj2LNKWN*xYKcPXn71bCL3TA*36kVscpDtEiS7VIt0*TUn9*a-OWG8PL1E3z-AILPVyg_'
        })
        .then(() => {
          context.commit('toggleIsLogin', true)
          context.commit('startComputeCurrent')
          window.$message({ type: 'success', message: '登录成功' })
        })
        .catch(imError => {
          if (imError.code === 2000) {
            window.$message.error(imError.message + ', 请检查是否正确填写了 SDKAPPID')
          } else {
            window.$message.error(imError.message)
          }
        })
    },
    logout(context) {
      // 若有当前会话，在退出登录时已读上报
      if (context.rootState.conversation.currentConversation.conversationID) {
        tim.setMessageRead({ conversationID: context.rootState.conversation.currentConversation.conversationID })
      }
      tim.logout().then(() => {
        context.commit('toggleIsLogin')
        context.commit('stopComputeCurrent')
        context.commit('reset')
      })
    }
  }
}

export default user
