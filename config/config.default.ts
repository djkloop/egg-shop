import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1558881396113_1457';

  // add your egg config in here
  config.middleware = [ 'auth' ];

  // add your special config in here
  const bizConfig = {
    view: {
      defaultViewEngine: 'nunjucks',
      mapping: {
        '.ejs': 'ejs',
        '.nj': 'nunjucks',
      },
    },
    auth: {
      match: '/admin',
    },
    mongoose: {
      client: {
        url: 'mongodb://eggxiaomi:123456@localhost:27017/eggxiaomi',
        options: {},
      },
    },
  };

  config.session = {
    maxAge: 864000,
    key: 'SESSION_SESSION',
    httpOnly: true,
    encrypt: true,
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
