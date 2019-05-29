import { Application } from 'egg';

export default (app: Application) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const d = new Date().getTime();
  const AccessSchema = new Schema({
    module_name: {
      // 模块名称
      type: String,
    },
    action_name: {
      // 操作名称
      type: String,
    },
    type: {
      // 节点类型
      // 1. 表示模块
      // 2. 表示菜单
      // 3/ 操作
      type: Number,
    },
    url: {
      type: String,
    },
    module_id: {
      // 和当前模型的_id关联
      type: Schema.Types.Mixed,
    },
    sort: {
      type: Number,
      default: 100,
    },
    description: {
      type: String,
    },
    status: {
      type: Number,
      default: 1,
    },
    add_time: {
      type: Number,
      default: d,
    },
  });

  return mongoose.model('Access', AccessSchema, 'access');
};
