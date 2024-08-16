// Функция isObjKey проверяет, является ли переданный
// ключ key ключом объекта obj.
// Параметры:
// key: Ключ, который нужно проверить.
// obj: Объект, в котором нужно проверить наличие ключа.
// Возвращаемое значение:
// boolean: true, если ключ key является ключом объекта obj, иначе false.

// function isObjKey(key: string, obj: object): key is keyof object {
//   return key in obj;
// }

type PlainObject<T = unknown> = {
  [k in string]: T;
};

function isPlainObject(value: unknown): value is PlainObject {
  return (
    typeof value === 'object' &&
    value !== null &&
    value.constructor === Object &&
    Object.prototype.toString.call(value) === '[object Object]'
  );
}

function isArray(value: unknown): value is unknown[] {
  return Array.isArray(value);
}

function isArrayOrObject(value: unknown): value is unknown[] | PlainObject {
  return isPlainObject(value) || isArray(value);
}

function getKey(key: string, parentKey?: string) {
  return parentKey ? `${parentKey}[${key}]` : key;
}

function getParams(
  data: PlainObject | unknown[],
  parentKey?: string,
): [string, string][] {
  const result: [string, string][] = [];

  if (isPlainObject(data)) {
    Object.entries(data).forEach(([key, value]) => {
      if (isArrayOrObject(value)) {
        result.push(...getParams(value, getKey(key, parentKey)));
      } else {
        result.push([
          getKey(key, parentKey),
          encodeURIComponent(String(value)),
        ]);
      }
    });
  } else if (isArray(data)) {
    data.forEach((value, index) => {
      if (isArrayOrObject(value)) {
        result.push(...getParams(value, getKey(String(index), parentKey)));
      } else {
        result.push([
          getKey(String(index), parentKey),
          encodeURIComponent(String(value)),
        ]);
      }
    });
  }

  return result;
}

function queryStringify(data: { [key: string]: string }): string {
  return Object.keys(data)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join('&');
}

function queryString(data: PlainObject): string {
  if (!isPlainObject(data)) {
    throw new Error('input must be an object');
  }

  return getParams(data)
    .map((arr) => arr.join('='))
    .join('&');
}

function isEqual<T>(lhs: T, rhs: T): boolean {
  if (typeof lhs !== typeof rhs) {
    return false;
  }

  if (typeof lhs !== 'object' || lhs === null || rhs === null) {
    return lhs === rhs;
  }

  if (isArray(lhs) && isArray(rhs)) {
    if (lhs.length !== rhs.length) {
      return false;
    }
    return lhs.every((value, index) => isEqual(value, rhs[index]));
  }

  if (isPlainObject(lhs) && isPlainObject(rhs)) {
    const lhsKeys = Object.keys(lhs);
    const rhsKeys = Object.keys(rhs);

    if (lhsKeys.length !== rhsKeys.length) {
      return false;
    }

    return lhsKeys.every((key) => isEqual(lhs[key], rhs[key]));
  }

  return false;
}

export { isPlainObject, queryString, queryStringify, isEqual };
