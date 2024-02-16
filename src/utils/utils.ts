// Функция isObjKey проверяет, является ли переданный
// ключ key ключом объекта obj.
// Параметры:
// key: Ключ, который нужно проверить.
// obj: Объект, в котором нужно проверить наличие ключа.
// Возвращаемое значение:
// boolean: true, если ключ key является ключом объекта obj, иначе false.

export function isObjKey(key: any, obj: {}): key is keyof {} {
  return key in obj;
}
