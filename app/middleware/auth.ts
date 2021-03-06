import { Context } from 'egg';
import * as url from 'url';

// 排除白名单
const WhiteUrlList = [
  '/admin/login',
  '/admin/doLogin',
  '/admin/verify',
  '/admin/loginOut',
];

export default function authMiddleWare(): any {
  return async (ctx: Context, next: () => Promise<any>) => {
    ctx.state.csrf = ctx.csrf;
    ctx.state.prevPage = ctx.request.headers.referer;
    const pathUrl = url.parse(ctx.request.url).pathname;
    if (ctx.session.userInfo) {
      ctx.state.userInfo = ctx.session.userInfo;
      const hasAuth = await ctx.service.admin.checkAuth();
      if (hasAuth) {
        ctx.state.navList = await ctx.service.admin.getAuthList(ctx.session.userInfo.role_id);
        await next();
      } else {
        ctx.body = `
        <body><head>
        <meta charset="utf-8">
        <title>403禁止页面模板</title>
        <style>
        @import url("https://fonts.googleapis.com/css?family=Share+Tech+Mono|Montserrat:700");
        * {
            margin: 0;
            padding: 0;
            border: 0;
            font-size: 100%;
            font: inherit;
            vertical-align: baseline;
            box-sizing: border-box;
            color: inherit;
        }
        body {
            background-image: linear-gradient(120deg, #4f0088 0%, #000000 100%);
            height: 100vh;
        }
        h1 {
            font-size: 45vw;
            text-align: center;
            position: fixed;
            width: 100vw;
            z-index: 1;
            color: #ffffff26;
            text-shadow: 0 0 50px rgba(0, 0, 0, 0.07);
            top: 50%;
            -webkit-transform: translateY(-50%);
                    transform: translateY(-50%);
            font-family: "Montserrat", monospace;
        }
        div {
            background: rgba(0, 0, 0, 0);
            width: 70vw;
            position: relative;
            top: 50%;
            -webkit-transform: translateY(-50%);
                    transform: translateY(-50%);
            margin: 0 auto;
            padding: 30px 30px 10px;
            box-shadow: 0 0 150px -20px rgba(0, 0, 0, 0.5);
            z-index: 3;
        }
        P {
            font-family: "Share Tech Mono", monospace;
            color: #f5f5f5;
            margin: 0 0 20px;
            font-size: 17px;
            line-height: 1.2;
        }
        span {
            color: #f0c674;
        }
        i {
            color: #8abeb7;
        }
        div a {
            text-decoration: none;
        }
        b {
            color: #81a2be;
        }
        a.avatar {
            position: fixed;
            bottom: 15px;
            right: -100px;
            -webkit-animation: slide 0.5s 4.5s forwards;
                    animation: slide 0.5s 4.5s forwards;
            display: block;
            z-index: 4
        }
        a.avatar img {
            border-radius: 100%;
            width: 44px;
            border: 2px solid white;
        }

        @-webkit-keyframes slide {
            from {
                right: -100px;
                -webkit-transform: rotate(360deg);
                        transform: rotate(360deg);
                opacity: 0;
            }
            to {
                right: 15px;
                -webkit-transform: rotate(0deg);
                        transform: rotate(0deg);
                opacity: 1;
            }
        }
        @keyframes slide {
            from {
                right: -100px;
                -webkit-transform: rotate(360deg);
                        transform: rotate(360deg);
                opacity: 0;
            }
            to {
                right: 15px;
                -webkit-transform: rotate(0deg);
                        transform: rotate(0deg);
                opacity: 1;
            }
        }
        </style>
        <body>
        <h1>403</h1>
        <div><p>&gt; <span>ERROR CODE</span>: "<i>HTTP 403 Forbidden</i>"</p>
        <p>&gt; <span>ERROR DESCRIPTION</span>: "<i>你没权限访问当前页面！</i>"</p>
        </div>
        <script>
        var str = document.getElementsByTagName('div')[0].innerHTML.toString();
        var i = 0;
        document.getElementsByTagName('div')[0].innerHTML = "";
        setTimeout(function() {
            var se = setInterval(function() {
                i++;
                document.getElementsByTagName('div')[0].innerHTML = str.slice(0, i) + "|";
                if (i == str.length) {
                    clearInterval(se);
                    document.getElementsByTagName('div')[0].innerHTML = str;
                }
            }, 60);
        },0);
        </script>
        `;
      }
    } else {
      if (pathUrl) {
        if (WhiteUrlList.includes(pathUrl)) {
          await next();
        } else {
          ctx.redirect('/admin/login');
        }
      }
    }
  };
}
