import BaseController from './base';

export default class RoleController extends BaseController {
  /**
   * 角色列表
   * @method index
   * @memberof RoleController
   */
  public async index() {
    const { ctx } = this;
    const result = await ctx.model.Role.find({});
    await ctx.render('admin/role/index.ejs', {
      list: result,
    });
  }

  /**
   * 增加角色
   * @method addRole
   * @memberof RoleController
   */
  public async addRole() {
    const { ctx } = this;
    await ctx.render('admin/role/add.ejs');
  }

  /**
   * 管理员增加角色
   *
   * @memberof RoleController
   */
  public async doAdd() {
    const { ctx } = this;
    const { title, description } = ctx.request.body;
    const role = new ctx.model.Role({
      title,
      description,
    });

    const result = await role.save();
    if (result) {
      await this.success('/admin/role', '增加角色成功');
    } else {
      await this.success('/admin/role', '增加角色失败');
    }
  }

  /**
   * 修改角色
   * @method updateRole
   * @memberof RoleController
   */
  public async updateRole() {
    const { ctx } = this;
    const { id } = ctx.request.query;
    const result = await ctx.model.Role.find({ _id: id });
    if (result) {
      await ctx.render('admin/role/update.ejs', {
        list: result[0],
      });
    } else {
      await this.error('/admin/role', '当前id没有数据');
    }

  }

  /**
   * 管理员增加角色
   *
   * @memberof RoleController
   */
  public async doEdit() {
    const { ctx } = this;
    const { title, description, _id } = ctx.request.body;
    await ctx.model.Role.updateOne({ _id }, {
      title,
      description,
    });
    await this.success('/admin/role', '编辑角色成功');
  }

  public async auth() {
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

    const role_id = ctx.request.query.id;
    const result = await this.service.admin.getAuthList(role_id);
    await ctx.render('admin/role/auth.ejs', { list: result, role_id });
  }

  public async doAuth() {
    const { ctx } = this;
    const { role_id, access_node } = ctx.request.body;
     // 1. 删除所有权限
    await ctx.model.RoleAccess.deleteMany({ role_id });
     // 2. 添加权限

    // 给role_access增加数据
    access_node.forEach(item => {
      const roleAccessData = new ctx.model.RoleAccess({
        role_id,
        access_id: item,
      });
      roleAccessData.save();
    });

    await this.success('/admin/role/auth?id=' + role_id, '授权成功');
  }

}
