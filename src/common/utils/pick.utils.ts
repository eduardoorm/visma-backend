export function pick(
  obj: Record<string, any>,
  keys: string[],
): Record<string, any> {
  return keys.reduce(
    (acc, key) => {
      if (key in obj) {
        acc[key] = obj[key];
      }
      return acc;
    },
    {} as Record<string, any>,
  );
}
