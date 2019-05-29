import { Controller } from 'egg';

export default class BaseController extends Controller {
  /**
   * success
   * @method success
   * @params redirectUrl 重置路由
   * @memberof BaseController
   */
  public async success(redirectUrl: string, message: string) {
    const { ctx } = this;
    await ctx.render('admin/public/success.ejs', {
      redirectUrl,
      message: message || '操作成功!',
    });
  }

  /**
   * error
   * @method error
   * @params redirectUrl 重置路由
   * @memberof BaseController
   */
  public async error(redirectUrl: string, message: string) {
    const { ctx } = this;
    await ctx.render('admin/public/error.ejs', {
      redirectUrl,
      message: message || '操作失败!',
    });
  }

  /**
   * 生成验证码
   *
   * @memberof BaseController
   */
  public async verify() {
    const captcha = await this.service.tools.capcha();
    this.ctx.response.type = 'image/svg+xml';
    this.ctx.body = captcha.data;
  }

  public async remove() {
    const { request } = this.ctx;
    const { model, id } = request.query;
    await this.ctx.model[model].deleteOne({ _id: id });
    this.ctx.redirect(this.ctx.state.prevPage);
  }

}
