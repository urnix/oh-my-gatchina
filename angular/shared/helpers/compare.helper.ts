export const isDeepEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);

const sort = (src: object) =>
  Object.keys(src)
    .sort()
    .map(key => src[key]);
