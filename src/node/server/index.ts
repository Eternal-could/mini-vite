// connect 是一个具有中间件机制的轻量级 Node.js 框架。
// 既可以单独作为服务器，也可以接入到任何具有中间件机制的框架中，如 Koa、Express
import connect from 'connect';
// picocolors 是一个用来在命令行显示不同颜色文本的工具
import {blue, green} from 'picocolors';
// 引入预构建
import {optimizer} from '../optimizer';
import {resolvePlugins} from '../plugins';
import {createPluginContainer, PluginContainer} from '../pluginContainer';
import {Plugin} from '../plugin';
import { indexHtmlMiddleware } from "./middlewares/indexHtml";
import {transformMiddleware} from './middlewares/transform';
import {staticMiddleware} from './middlewares/static';
import { ModuleGraph } from "../ModuleGraph";
import chokidar, { FSWatcher } from "chokidar";
import {createWebSocketServer} from '../ws';
import { bindingHMREvents } from "../hmr";
import { normalizePath } from "../utils";

export interface ServerContext {
  root: string;
  pluginContainer: PluginContainer;
  app: connect.Server;
  plugins: Plugin[];
  moduleGraph: ModuleGraph;
  ws: { send: (data: any) => void; close: () => void };
  watcher: FSWatcher;
}


export async function startDevServer() {
  const moduleGraph = new ModuleGraph((url) => pluginContainer.resolveId(url));
  const app = connect();
  const root = process.cwd();
  const startTime = Date.now();
  const plugins = resolvePlugins();
  const pluginContainer = createPluginContainer(plugins);
  const watcher = chokidar.watch(root, {
    ignored: ["**/node_modules/**", "**/.git/**"],
    ignoreInitial: true,
  });
  // WebSocket 对象
  const ws = createWebSocketServer(app);
  const serverContext: ServerContext = {
    root: process.cwd(),
    app,
    pluginContainer,
    plugins,
    moduleGraph,
    ws,
    watcher
  };
  bindingHMREvents(serverContext);
  for (const plugin of plugins) {
    if (plugin.configureServer) {
      await plugin.configureServer(serverContext);
    }
  }

  // // 核心编译逻辑
  app.use(transformMiddleware(serverContext));

  // 入口 HTML 资源
  app.use(indexHtmlMiddleware(serverContext));

  // 静态资源
  app.use(staticMiddleware(serverContext.root));

  app.listen(3000, async () => {
    await optimizer(root);
    console.log(
      green('🚀 No-Bundle 服务已经成功启动!'),
      `耗时: ${Date.now() - startTime}ms`
    );
    console.log(`> 本地访问路径: ${blue('http://localhost:3000')}`);
  });
}
