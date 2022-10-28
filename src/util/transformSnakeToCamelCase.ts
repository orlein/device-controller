function transformSnakeToCamelCase(snakeCaseString: any): string {
  if (typeof snakeCaseString !== "string") {
    return snakeCaseString;
  }
  return snakeCaseString.replace(/([-_][a-z])/gi, ($1) =>
    $1.toUpperCase().replace("-", "").replace("_", "")
  );
}

function isObject(obj: any) {
  return (
    obj === Object(obj) && !Array.isArray(obj) && typeof obj !== "function"
  );
}

export function keysToCamel(obj: any) {
  if (isObject(obj)) {
    return Object.keys(obj).reduce((acc, key) => {
      return {
        ...acc,
        [transformSnakeToCamelCase(key)]: keysToCamel(obj[key]),
      };
    }, {});
  }

  if (Array.isArray(obj)) {
    return obj.map((i) => keysToCamel(i));
  }

  return obj;
}
