// Функция isObjKey проверяет, является ли переданный
// ключ key ключом объекта obj.
// Параметры:
// key: Ключ, который нужно проверить.
// obj: Объект, в котором нужно проверить наличие ключа.
// Возвращаемое значение:
// boolean: true, если ключ key является ключом объекта obj, иначе false.

function isObjKey(key: string, obj: object): key is keyof object {
  return key in obj;
}

type PlainObject<T = any> = {
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

function isArray(value: unknown): value is [] {
  return Array.isArray(value);
}

function isArrayOrObject(value: unknown): value is [] | PlainObject {
  return isPlainObject(value) || isArray(value);
}

function getKey(key: string, parentKey?: string) {
  return parentKey ? `${parentKey}[${key}]` : key;
}

function getParams(
  data: PlainObject | [],
  parentKey?: string,
): [string, string][] {
  const result: [string, string][] = [];

  Object.entries(data).forEach(([key, value]) => {
    if (isArrayOrObject(value)) {
      result.push(...getParams(value, getKey(key, parentKey)));
    } else {
      result.push([getKey(key, parentKey), encodeURIComponent(String(value))]);
    }
  });

  return result;
}

function queryString(data: PlainObject): string {
  if (!isPlainObject(data)) {
    throw new Error('input must be an object');
  }

  return getParams(data)
    .map((arr) => arr.join('='))
    .join('&');
}

function isEqual(lhs: PlainObject, rhs: PlainObject): boolean {
  if (Object.keys(lhs).length !== Object.keys(rhs).length) {
    return false;
  }

  for (const [key, value] of Object.entries(lhs)) {
    const rightValue = rhs[key];
    if (isArrayOrObject(value) && isArrayOrObject(rightValue)) {
      if (isEqual(value, rightValue)) {
        continue;
      }
      return false;
    }

    if (value !== rightValue) {
      return false;
    }
  }

  return true;
}

export { isObjKey, queryString, isEqual };
