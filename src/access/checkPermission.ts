import PERMISSION_ENUM from "@/access/permissionEnum";

/**
 * 全局检查用户权限函数（根据需要的权限判断用户是否有权限进入某个页面）
 * @param user 用户信息
 * @param needPermission 需要的权限
 * @return boolean
 */
const checkPermission = (
  user: any,
  needPermission: string = PERMISSION_ENUM.NOT_LOGIN
) => {
  // 获取用户权限
  const userPermission = user?.userRole ?? PERMISSION_ENUM.NOT_LOGIN;
  // 用户未登录但是需要的是 user 权限
  if (
    needPermission === PERMISSION_ENUM.USER &&
    userPermission === PERMISSION_ENUM.NOT_LOGIN
  ) {
    return false;
  }
  // 用户需要的是 admin 权限，但是用户不是 admin
  if (
    needPermission === PERMISSION_ENUM.ADMIN &&
    userPermission !== PERMISSION_ENUM.ADMIN
  ) {
    return false;
  }
  return true;
};

export default checkPermission;
