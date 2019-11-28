import {
  getToken,
  getName,
  setToken,
  removeToken
} from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    Account: getName('Account'),
    NetbarId: getName('NetbarId'),
    RealName: '',
    avatar: '',
    roles: [],
    NetbarUserDtoList: {}
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_ACCOUNT: (state, Account) => {
      state.Account = Account
    },
    SET_NETBARID: (state, NetbarId) => {
      state.NetbarId = NetbarId
    },
    SET_NAME: (state, RealName) => {
      state.RealName = RealName
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 登录
    Login({
      commit
    }, AccessToken) {
      return new Promise((resolve, reject) => {
        console.log(AccessToken);
        setToken(AccessToken)
        commit('SET_TOKEN', AccessToken)
        resolve()
      })
    },
    //
    // // 获取用户信息
    GetInfo({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        // getInfo(state.token).then(response => {
        //   const data = response.data
        //   if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
        //     commit('SET_ROLES', data.roles)
        //   } else {
        //     reject('getInfo: roles must be a non-null array !')
        //   }
        //   // commit('SET_NAME', data.name)
        //   commit('SET_AVATAR', data.avatar)
        //   resolve(response)
        // }).catch(error => {
        //   reject(error)
        // })
      })
    },
  }
}

export default user
