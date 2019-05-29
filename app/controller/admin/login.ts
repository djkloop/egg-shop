import BaseController from './base';

export default class RoleController extends BaseController {
  /**
   * 角色列表
   * @method index
   * @memberof RoleController
   */
  public async index() {
    const { ctx } = this;
    await ctx.render('admin/login.ejs');
  }

  /**
   * 登陆的方法
   *
   * @memberof RoleController
   */
  public async doLogin() {
    const { ctx } = this;
    let { username, password, code } = ctx.request.body;
    password = await this.service.tools.md5(password!);
    if (code.toLowerCase() === ctx.session.code.toLowerCase()) {
      console.log(username, password);
      const result = await ctx.model.Admin.find({
       username,
       password,
      });
      if (result.length > 0) {
        // 登陆成功
        ctx.session.userInfo = result[0];
        ctx.redirect('/admin/manager');
      } else {
        await this.error('/admin/login', '用户名或密码错误');
      }
    } else {
      await this.error('/admin/login', '验证码错误');
    }
  }

  public async loginOut() {
    this.ctx.session.userInfo = null;
    this.ctx.redirect('/admin/login');
  }

}
