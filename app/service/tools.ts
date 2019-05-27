import { Service } from 'egg';
import * as svgCaptcha from 'svg-captcha';
import * as md5 from 'md5';

/**
 * Test Service
 */
export default class ToolsService extends Service {

  /**
   * 生成验证码
   *
   * @returns
   * @memberof ToolsService
   */
  public async capcha() {
    const captcha = svgCaptcha.create({
      size: 1,
      noise: 6, // 干扰线条的数量
      color: true, // 验证码的字符是否有颜色，默认没有，如果设定了背景，则默认有
      background: '#cc9966', // 验证码图片背景颜色
    });
    this.ctx.session.code = captcha.text;
    return captcha;
  }

  /**
   * 加密
   *
   * @param {string} str
   * @returns
   * @memberof ToolsService
   */
  public async md5(str: string) {
    return md5(str);
  }
}
