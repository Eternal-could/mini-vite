import { Plugin } from "../plugin";
import {resolvePlugin} from './resolve';
import {esbuildTransformPlugin} from './esbuild';
import {importAnalysisPlugin} from './importAnalysis';

export function resolvePlugins(): Plugin[] {
  // 下一部分会逐个补充插件逻辑
  return [resolvePlugin(), esbuildTransformPlugin(), importAnalysisPlugin()];
}
