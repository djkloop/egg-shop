import BaseController from './base';

export default class ManagerController extends BaseController {
  /**
   * 管理员列表
   * @method index
   * @memberof ManagerController
   */
  public async index() {
    const { ctx } = this;
    // 查询管理员 关联角色表
    const result = await ctx.model.Admin.aggregate([
      {
        $lookup: {
          from: 'role',
          localField: 'role_id',
          foreignField: '_id',
          as: 'roles',
        },
      },
    ]);
    console.log(JSON.stringify(result));
    await ctx.render('admin/manager/index.ejs', {
      result,
    });
  }

  /**
   * 增加管理员
   * @method addManager
   * @memberof ManagerController
   */
  public async addManager() {
    const { ctx } = this;
    const roleResult = await ctx.model.Role.find();
    await ctx.render('admin/manager/add.ejs', {
      roleResult,
    });
  }

  /**
   * 增加管理员
   *
   * @memberof RoleController
   */
  public async doAdd() {
    const { ctx } = this;
    const addResult = ctx.request.body;
    addResult.password = await this.service.tools.md5(addResult.password);
    // 判断用户是否存在
    const adminResult = await ctx.model.Admin.find({ username: addResult.username });
    if (adminResult.length > 0) {
      await this.error('/admin/manager/add', '管理员已经存在，请勿重复添加');
    } else {
      const admin = new ctx.model.Admin(addResult);
      const result = admin.save();
      if (result) {
        await this.success('/admin/manager', '增加管理员成功');
      } else {
        await this.error('/admin/manager/add', '增加管理员失败');
      }
    }
  }

  /**
   * 修改管理员
   * @method updateManager
   * @memberof ManagerController
   */
  public async updateManager() {
    const { ctx } = this;
    const id = ctx.request.query.id;

    const adminResult = await ctx.model.Admin.find({ _id: id });

    // 获取角色
    const roleResult = await ctx.model.Role.find();
    await ctx.render('admin/manager/edit.ejs', {
      roleResult,
      adminResult: adminResult[0],
    });
  }

  public async doEdit() {
    const { ctx } = this;
    const body = ctx.request.body;
    const obj = Object.assign({}, body);
    console.log(obj);
    if (!body.password) {
      delete obj.password;
    } else {
      obj.password = await this.service.tools.md5(body.password);
    }
    await ctx.model.Admin.updateOne({ _id: body._id }, obj);
    await this.success('/admin/manager', '编辑管理员成功');
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
