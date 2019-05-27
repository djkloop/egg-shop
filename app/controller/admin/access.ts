import { Controller } from 'egg';

export default class AccessController extends Controller {
  /**
   * 权限列表
   * @method index
   * @memberof AccessController
   */
  public async index() {
    const { ctx } = this;
    await ctx.render('admin/access/index.ejs');
  }

  /**
   * 增加权限
   * @method addAccess
   * @memberof AccessController
   */
  public async addAccess() {
    const { ctx } = this;
    await ctx.render('admin/access/add.ejs');
  }

  /**
   * 修改权限
   * @method updateAccess
   * @memberof AccessController
   */
  public async updateAccess() {
    const { ctx } = this;
    await ctx.render('admin/access/update.ejs');
  }

  /**
   * 删除权限
   * @method removeAccess
   * @memberof AccessController
   */
  public async removeAccess() {
    const { ctx } = this;
    await ctx.render('admin/access/remove.ejs');
  }

}
