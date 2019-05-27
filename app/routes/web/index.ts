import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;
  // web
  router.get('/web/home', controller.web.home.index);
};
