import { Application } from 'egg';

export default (app: Application) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const d = new Date();
  const AdminSchema = new Schema({
    username: {
      type: String,
    },
    password: {
      type: String,
    },
    mobile: {
      type: Number,
    },
    email: {
      type: String,
    },
    status: {
      type: Number,
      default: 1,
    },
    role_id: {
      type: Schema.Types.ObjectId,
    },
    add_time: {
      type: Number,
      default: d,
    },
    is_super: {
      type: Number,
    },
  });

  return mongoose.model('User', AdminSchema);
};
