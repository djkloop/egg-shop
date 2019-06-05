import { Service } from 'egg';
import * as url from 'url';

/**
 * Admin Service
 */
export default class AdminService extends Service {

  /**
   *
   *
   * @memberof AdminService
   */
  public async checkAuth() {
    /**
     *
     * 1. 获取当前用户角色
     * 2. 根据角色获取当前角色的权限列表
     * 3. 获取当前访问的url，对应的权限id
     * 4. 判断当前访问的url, 对应的权限id，是否在权限列表中的id
     */

     // 1. 湖区当前用户的角色
     const userInfo = this.ctx.session.userInfo;
     const role_id = userInfo.role_id;
     const pathname = url.parse(this.ctx.request.url).pathname;
     // 排除白名单
     const WhiteUrlList = [
        '/admin/login',
        '/admin/doLogin',
        '/admin/verify',
        '/admin/loginOut',
      ];
     if (WhiteUrlList.includes(pathname!) || userInfo.is_super === 1) {
        return true;
      }
     // 2. 根据角色获取当前角色的权限列表
     const accessResult = await this.ctx.model.RoleAccess.find({ role_id });
     const accessArray: any[] = [];
     accessResult.forEach(access => {
      accessArray.push(access.access_id.toString());
     });
     // 3. 获取当前的url
     const accessUrlResult = await this.ctx.model.Access.find({ url: pathname });
     // 4. 判断当前访问的url对用的权限id
     if (accessUrlResult.length > 0) {
      if (accessArray.includes(accessUrlResult[0]._id.toString())) {
        return true;
      } else {
        return false;
      }
     }
  }

  public async getAuthList(role_id) {
    const { ctx } = this;

    /**
     * 1. 获取全部的权限
     *
     * 2. 查询当前角色拥有的权限（查询当前觉得权限id）把查找到的数据放在数组中
     *
     * 3. 循环遍历所有的权限数据
     *  1. 判断当前权限是否在角色权限的数组中
     *  2. 如果在角色权限的数组中，选中，
     *  3. 如果不在角色权限的数组中，不选中
     */

    // 获取全部的权限
    const result = await ctx.model.Access.aggregate([
      {
        $lookup: {
          from: 'access',
          localField: '_id',
          foreignField: 'module_id',
          as: 'items',
        },
      },
      {
        $match: {
          module_id: '0',
        },
      },
    ]);
    // 查询当前角色的权限
    const accessResult = await ctx.model.RoleAccess.find({ role_id });
    const roleAccessArray: any[] = [];
    accessResult.forEach(accessObj => {
      roleAccessArray.push(accessObj.access_id.toString());
    });
    for (const item of result) {
      if (roleAccessArray.includes(item._id.toString())) {
        item.checked = true;
      }
      for (const child of item.items) {
        if (roleAccessArray.includes(child._id.toString())) {
          child.checked = true;
        }
      }
    }
    return result;
  }
}
