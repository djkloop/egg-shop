import { Application } from 'egg';
import AdminRouter from './routes/admin';
import WebRouter from './routes/web';

export default (app: Application) => {
  // web
  WebRouter(app);
  // admin
  AdminRouter(app);
};
