import { Controller } from 'egg';

export default class RoleController extends Controller {
  /**
   * 角色列表
   * @method index
   * @memberof RoleController
   */
  public async index() {
    const { ctx } = this;
    await ctx.render('admin/role/index.ejs');
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
   * 修改角色
   * @method updateRole
   * @memberof RoleController
   */
  public async updateRole() {
    const { ctx } = this;
    await ctx.render('admin/role/update.ejs');
  }

  /**
   * 删除角色
   * @method removeRole
   * @memberof RoleController
   */
  public async removeRole() {
    const { ctx } = this;
    await ctx.render('admin/role/remove.ejs');
  }

}
