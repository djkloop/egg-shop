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

  public async changeStatus() {
    const { model, attr, id } = this.ctx.request.query;
    const result = await this.ctx.model[model].find({ _id: id });
    let json = {};
    if (result.length > 0) {
      if (result[0][attr] === 1) {
        json = {
          [attr]: 0,
        };
      } else {
        json = {
          [attr]: 1,
        };
      }
      const updateResult = await this.ctx.model[model].updateOne({ _id: id }, json);
      if (updateResult) {
        this.ctx.body = {
          message: '更新成功',
          success: true,
        };
      } else {
        this.ctx.body = {
          message: '更新失败, 参数错误',
          success: false,
        };
      }
    } else {
      this.ctx.body = {
        message: '更新失败, 参数错误',
        success: false,
      };
    }
  }

}
