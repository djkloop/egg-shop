import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;
  // admin
  router.get('/admin/login', controller.admin.login.index);
  router.post('/admin/doLogin', controller.admin.login.doLogin);
  router.get('/admin/loginOut', controller.admin.login.loginOut);

  router.get('/admin/verify', controller.admin.login.verify);
  router.get('/admin/remove', controller.admin.base.remove);

  router.get('/admin/manager', controller.admin.manager.index);
  router.get('/admin/manager/add', controller.admin.manager.addManager);
  router.post('/admin/manager/doAdd', controller.admin.manager.doAdd);
  router.post('/admin/manager/doEdit', controller.admin.manager.doEdit);

  router.get('/admin/manager/update', controller.admin.manager.updateManager);
  router.get('/admin/manager/remove', controller.admin.manager.removeManager);

  // role
  router.get('/admin/role', controller.admin.role.index);
  router.get('/admin/role/add', controller.admin.role.addRole);
  router.post('/admin/role/doAdd', controller.admin.role.doAdd);
  router.post('/admin/role/doEdit', controller.admin.role.doEdit);

  router.get('/admin/role/update', controller.admin.role.updateRole);
  router.get('/admin/role/remove', controller.admin.role.removeRole);

  // access
  router.get('/admin/access', controller.admin.access.index);
  router.get('/admin/access/add', controller.admin.access.addAccess);
  router.post('/admin/access/doAdd', controller.admin.access.doAdd);

  router.get('/admin/access/update', controller.admin.access.updateAccess);
  router.get('/admin/access/remove', controller.admin.access.removeAccess);
};
