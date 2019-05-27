import { Controller } from 'egg';

export default class RoleController extends Controller {
  /**
   * 角色列表
   * @method index
   * @memberof RoleController
   */
  public async index() {
    const { ctx } = this;
    await ctx.render('admin/login.ejs');
  }

}
