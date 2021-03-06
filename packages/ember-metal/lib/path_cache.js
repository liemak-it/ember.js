import Cache from './cache';

const IS_GLOBAL      = /^[A-Z$]/;
const IS_GLOBAL_PATH = /^[A-Z$].*[\.]/;

const isGlobalCache      = new Cache(1000, key => IS_GLOBAL.test(key));
const isGlobalPathCache  = new Cache(1000, key => IS_GLOBAL_PATH.test(key));
const firstDotIndexCache = new Cache(1000, key => key.indexOf('.'));

const firstKeyCache = new Cache(1000, (path) => {
  let index = firstDotIndexCache.get(path);
  if (index === -1) {
    return path;
  } else {
    return path.slice(0, index);
  }
});

const tailPathCache = new Cache(1000, (path) => {
  let index = firstDotIndexCache.get(path);
  if (index !== -1) {
    return path.slice(index + 1);
  }
});

export const caches = {
  isGlobalCache,
  isGlobalPathCache,
  firstDotIndexCache,
  firstKeyCache,
  tailPathCache
};

export function isGlobal(path) {
  return isGlobalCache.get(path);
}

export function isGlobalPath(path) {
  return isGlobalPathCache.get(path);
}

export function isPath(path) {
  return firstDotIndexCache.get(path) !== -1;
}

export function getFirstKey(path) {
  return firstKeyCache.get(path);
}

export function getTailPath(path) {
  return tailPathCache.get(path);
}
