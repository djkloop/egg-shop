import BaseController from './base';

export default class AccessController extends BaseController {
  /**
   * 权限列表
   * @method index
   * @memberof AccessController
   */
  public async index() {
    const { ctx } = this;
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
    console.log(result);
    await ctx.render('admin/access/index.ejs', {
      list: result,
    });
  }

  /**
   * 增加权限
   * @method addAccess
   * @memberof AccessController
   */
  public async addAccess() {
    const { ctx } = this;
    const moduleResult = await ctx.model.Access.find({ module_id: '0' });
    console.log(moduleResult);
    await ctx.render('admin/access/add.ejs', {
      moduleList: moduleResult,
    });
  }

  /**
   * 增加权限
   *
   * @memberof AccessController
   */
  public async doAdd() {
    const { ctx } = this;
    const addResult = ctx.request.body;
    const obj: any = {};
    if (addResult.type === '2') {
      obj.action_name = addResult.action_name;
    } else if (addResult.type === '1') {
      obj.module_name = addResult.module_name;
    }
    if (addResult.module_id) {
      addResult.module_id = this.app.mongoose.Types.ObjectId(addResult.module_id);
    }
    // 判断用户是否存在
    if (addResult.type !== '3') {
      const AccessResult = await ctx.model.Access.find(obj);
      if (AccessResult.length > 0) {
        await this.error('/admin/access/add', '权限已经存在，请勿重复添加');
      } else {
        const access = new ctx.model.Access(addResult);
        const result = await access.save();
        if (result) {
          await this.success('/admin/access', '增加权限成功');
        } else {
          await this.error('/admin/access/add', '增加权限失败');
        }
      }
    } else {
      const access = new ctx.model.Access(addResult);
      const result = await access.save();
      if (result) {
          await this.success('/admin/access', '增加权限成功');
        } else {
          await this.error('/admin/access/add', '增加权限失败');
        }
    }
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
