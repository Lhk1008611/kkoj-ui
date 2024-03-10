import store from "@/store";
import router from "@/router";
import PERMISSION_ENUM from "@/access/permissionEnum";
import checkPermission from "@/access/checkPermission";

//在路由跳转前执行
router.beforeEach(async (to, from, next) => {
  //自动登录逻辑

  if (store.state.user?.loginUserInfo.userRole == null) {
    await store.dispatch("user/getUserInfo");
  }

  const userinfo = store.state.user?.loginUserInfo;
  const userRole = userinfo.userRole;

  const needPermission = to.meta?.access ?? PERMISSION_ENUM.NOT_LOGIN;
  //页面只需要未登录权限则直接跳转
  if (needPermission == PERMISSION_ENUM.NOT_LOGIN) {
    next();
    return;
  }

  //页面需要登录权限
  //用户未登录
  if (!userRole || userRole == PERMISSION_ENUM.NOT_LOGIN) {
    //跳转到登录页，登录成功重定向会原页面
    next(`user/login?redirect:${to.fullPath}`);
    return;
  }
  //用户已登陆，先检查权限
  if (!checkPermission(userinfo, needPermission as string)) {
    next("/no-auth");
    return;
  }
  next();
});
