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
