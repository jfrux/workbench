export const YELLOW = "#cbcb41";
export const ORANGE = "#e37933";
export const RED = "#cc3e44";
export const PINK = "#f55385";
export const PURPLE = "#a074c4";
export const BLUE = "#519aba";
export const DARK = "#41535b";
export const LIGHT = "#d4d7d6";
export const CPP_LANGUAGE = { name: "CPlusPlusLanguage", color: ORANGE };
export const FileTypeIconMapping = {
  "cpp": CPP_LANGUAGE,
  "cc": CPP_LANGUAGE,
  "c": CPP_LANGUAGE,
  "o": { name: "Favicon", color: YELLOW },
  "h": {...CPP_LANGUAGE, color: YELLOW },
  "py": { name: "PythonLanguage", color: YELLOW },
  "pyc": { name: "PythonLanguage", color: YELLOW },
  "js": { name: "JavaScriptLanguage", color: YELLOW },
  "md": { name: "RawSource", color: BLUE },
  "none": { name: "RawSource", color: DARK },
  "json": { name: "Code", color: YELLOW },
  "yaml": { name: "FileYML", color: PURPLE },
  "yml": { name: "FileYML", color: PURPLE },
  "sass": { name: "FileSASS", color: PINK },
  "scss": { name: "FileSCSS", color: PINK },
  "gitignore": { name: "GitGraph", color: DARK },
  "html": { name: "FileCode", color: YELLOW },
  "sh": { name: "Script", color: ORANGE }
};
export const FileNameIconMapping = {
  "Makefile": { name: "AllApps", color: RED },
  "Dockerfile.openpilot": { name: "AllApps", color: DARK },
  "requirements_openpilot.txt": { name: "AllApps", color: DARK },
  ".travis.yml": { name: "Settings", color: PURPLE },
  "LICENSE": { name: "RawSource", color: BLUE },
  // "CONTRIBUTING.md": { name: "UserFollowed", color: BLUE },
  "README": { name: "RawSource", color: BLUE }
};