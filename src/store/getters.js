const getters = {
  sidebar: (state) => state.app.sidebar,
  size: (state) => state.app.size,
  device: (state) => state.app.device,
  visitedViews: (state) => state.tagsView.visitedViews,
  cachedViews: (state) => state.tagsView.cachedViews,
  token: (state) => state.user.token,
  avatar: (state) => state.user.avatar,
  name: (state) => state.user.name,
  introduction: (state) => state.user.introduction,
  roles: (state) => state.user.roles,
  permissions: (state) => state.user.permissions,
  permission_routes: (state) => state.permission.routes,
  topbarRouters: (state) => state.permission.topbarRouters,
  defaultRoutes: (state) => state.permission.defaultRoutes,
  sidebarRouters: (state) => state.permission.sidebarRouters,
  lightLevel: (state) => state.screen.lightLevel,
  msgCount: (state) => state.msg.msgArr.length,
  usersInfo: (state) => state.user.user,
  messages: (state) => state.user.messages, // 消息列表
  unread: (state) =>
    state.user.messages.filter((item) => !item.readFlag).length, //未读数量
}
export default getters
