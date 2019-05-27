import { Controller } from 'egg';

export default class ManagerController extends Controller {
  /**
   * 管理员列表
   * @method index
   * @memberof ManagerController
   */
  public async index() {
    const { ctx } = this;
    // ctx.body = '管理员列表';
    await ctx.render('admin/manager/index.ejs', {
      username: '展示干',
    });
  }

  /**
   * 增加管理员
   * @method addManager
   * @memberof ManagerController
   */
  public async addManager() {
    const { ctx } = this;
    await ctx.render('admin/manager/add.ejs', {
      username: '展示干',
    });
  }

  /**
   * 修改管理员
   * @method updateManager
   * @memberof ManagerController
   */
  public async updateManager() {
    const { ctx } = this;
    await ctx.render('admin/manager/edit.ejs', {
      username: '展示干',
    });
  }

  /**
   * 删除管理员
   * @method removeManager
   * @memberof ManagerController
   */
  public async removeManager() {
    const { ctx } = this;
    ctx.body = '删除管理员';
  }

}
