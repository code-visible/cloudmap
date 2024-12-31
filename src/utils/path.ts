
export const getNameFromPath = (path: string): string => {
  for (let i = path.length - 1; i >= 0; i--) {
    if (path.charAt(i) === '/') return path.substring(i + 1);
  }
  return path;
};

export const getPrefixPathFromPath = (path: string): string => {
  for (let i = path.length - 1; i >= 0; i--) {
    if (path.charAt(i) === '/') return path.substring(0, i);
  }
  return "";
};

export const normalizePath = (path: string): string => {
  let m = 0;
  let n = path.length - 1;
  for (; m < path.length; m++) {
    const ch = path.charAt(m);
    if (ch !== '/' && ch !== ' ') break;
  }
  for (; n >= m; n--) {
    const ch = path.charAt(n);
    if (ch !== '/' && ch !== ' ') break;
  }
  if (m === n && (path.charAt(m) === '/' || path.charAt(m) === ' ')) return "";
  return path.substring(m, n + 1);
}