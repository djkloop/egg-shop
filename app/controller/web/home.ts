import { Controller } from 'egg';

export default class HomeController extends Controller {
  public async index() {
    const { ctx } = this;
    await ctx.render('web/home/home.nj', {
      username: 'nj',
    });
  }
}
