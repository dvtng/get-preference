/**
 * Set a value deep in an object by its dot-separated path.
 *
 * E.g. setInPath(obj, "nested.value", 1);
 */
export const setInPath = (
  object: { [key: string]: any },
  path: string[],
  value: any
): void => {
  const key = path[0];
  if (path.length === 1) {
    object[key] = value;
    return;
  }
  if (!object[key]) {
    object[key] = {};
  }
  setInPath(object[key], path.slice(1), value);
};
