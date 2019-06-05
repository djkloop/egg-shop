import BaseController from './base';
import * as path from 'path';
import * as fs from 'fs';
import * as pump from 'mz-modules/pump';

export default class UploadController extends BaseController {
  /**
   * 单文件上传页面
   * @method single
   * @memberof UploadController
   */
  public async single() {
    const { ctx } = this;
    await ctx.render('admin/upload/img/single.ejs');
  }

  /**
   * 单文件上传
   *
   * @method singleUpload
   * @memberof UploadController
   */
  public async singleUpload() {
    const { ctx } = this;

    const stream = await ctx.getFileStream();
    // const { fields } = stream;
    const target = 'app/public/admin/upload/' + path.basename(stream.filename);
    const writeStream = fs.createWriteStream(target);
    await pump(stream, writeStream);
    this.ctx.body = {
      url: target,
      fields: stream.fields,
    };
  }

  /**
   * 多文件页面
   *
   * @method multiple
   * @memberof UploadController
   */
  public async multiple() {
    const { ctx } = this;
    await ctx.render('admin/upload/img/multiple.ejs');
  }

  /**
   * 多文件上传
   *
   * @method multipleUpload
   * @memberof UploadController
   */
  public async multipleUpload() {

  }

}
