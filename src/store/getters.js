const getters = {
  NetbarUserDtoList: state => state.user.NetbarUserDtoList,
  NetbarId: state => state.user.NetbarId,
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  Account: state => state.user.Account,
  avatar: state => state.user.avatar,
  RealName: state => state.user.RealName,
  roles: state => state.user.roles
}
export default getters
