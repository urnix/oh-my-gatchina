export function without<T>(items: Array<T>, obj: any): Array<T> {
  const index = items.indexOf(obj);
  return index > -1 ? [...items.slice(0, index), ...items.slice(index + 1)] : items;
}
