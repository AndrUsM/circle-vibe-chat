export const NATIVE_BROWSER_PREVIEW_EXTENSIONS: string[] = [
  // IMAGES
  ".jpg",
  ".jpeg",
  ".png",
  ".gif",

  // VIDEOS
  ".mp4",
  ".webm",

  // PLAIN TEXT
  "txt",
  "md",
  "rtf",
  "log",

  // NOT NATIVE / PARIALLY SUPPORTED
  "pdf",
  "odt",
  "epub",
  "rtf",
  "doc",
  "docx",

  // CONFIGURATION FILES
  "ini",
  "yml",
  "yaml",
  "csv",
  "tsv",

  // SOURCE CODE
  "php",
  "py",
  "rb",
  "java",
  "c",
  "cpp",
  "sh",
  "ts",
  "html",
  "htm",
  "css",
  "js",
  "json",
  "xml",
  "svg",
  "vtt",

  // CAPTIONS
  "vtt",
  "srt",
];

export const NATIVE_BROWSER_EXTENSIONS_REGEXP = new RegExp(`(${NATIVE_BROWSER_PREVIEW_EXTENSIONS.join("|")})$`, "i");