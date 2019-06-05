// This file is created by egg-ts-helper@1.25.3
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAdminAccess from '../../../app/controller/admin/access';
import ExportAdminBase from '../../../app/controller/admin/base';
import ExportAdminLogin from '../../../app/controller/admin/login';
import ExportAdminManager from '../../../app/controller/admin/manager';
import ExportAdminRole from '../../../app/controller/admin/role';
import ExportAdminUpload from '../../../app/controller/admin/upload';
import ExportWebHome from '../../../app/controller/web/home';

declare module 'egg' {
  interface IController {
    admin: {
      access: ExportAdminAccess;
      base: ExportAdminBase;
      login: ExportAdminLogin;
      manager: ExportAdminManager;
      role: ExportAdminRole;
      upload: ExportAdminUpload;
    }
    web: {
      home: ExportWebHome;
    }
  }
}
