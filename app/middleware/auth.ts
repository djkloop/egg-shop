import { Context } from 'egg';
import * as url from 'url';

// 排除白名单
const WhiteUrlList = [
  '/admin/login',
  '/admin/doLogin',
  '/admin/verify',
];

export default function authMiddleWare(): any {
  return async (ctx: Context, next: () => Promise<any>) => {
    ctx.state.csrf = ctx.csrf;
    const pathUrl = url.parse(ctx.request.url).pathname;
    if (ctx.session.userInfo) {
      ctx.state.userInfo = ctx.session.userInfo;
      await next();
    } else {
      if (pathUrl) {
        if (WhiteUrlList.includes(pathUrl)) {
          await next();
        } else {
          ctx.redirect('/admin/login');
        }
      }
    }
  };
}
