import { Application } from 'egg';

export default (app: Application) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const d = new Date().getTime();
  const RoleSchema = new Schema({
    title: {
      type: String,
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

  return mongoose.model('Role', RoleSchema, 'role');
};
