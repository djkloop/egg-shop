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
