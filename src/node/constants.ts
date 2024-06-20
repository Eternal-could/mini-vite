import path from 'path'
export const EXTERNAL_TYPES = [
  "css",
  "less",
  "sass",
  "scss",
  "styl",
  "stylus",
  "pcss",
  "postcss",
  "vue",
  "svelte",
  "marko",
  "astro",
  "png",
  "jpe?g",
  "gif",
  "svg",
  "ico",
  "webp",
  "avif",
]

// 正则表达式：以字母、数字、下划线或 @ 开头，并且第二个字符不是冒号` : `的任意字符串。
export const BARE_IMPORT_RE = /^[\w@][^:]/;
// 将预构建产物默认存放在 node_modules 中的 .m-vite 目录中
export const PRE_BUNDLE_DIR = path.join('node_modules', '.m-vite')

export const JS_TYPES_RE = /\.(?:j|t)sx?$|\.mjs$/;
export const QEURY_RE = /\?.*$/s;
export const HASH_RE = /#.*$/s;
export const DEFAULT_EXTERSIONS = [".tsx", ".ts", ".jsx", "js"];
export const HMR_PORT = 24678;
export const CLIENT_PUBLIC_PATH = "/@vite/client";
