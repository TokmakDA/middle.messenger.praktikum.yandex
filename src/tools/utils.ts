// Функция isObjKey проверяет, является ли переданный
// ключ key ключом объекта obj.
// Параметры:
// key: Ключ, который нужно проверить.
// obj: Объект, в котором нужно проверить наличие ключа.
// Возвращаемое значение:
// boolean: true, если ключ key является ключом объекта obj, иначе false.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isObjKey(key: string, obj: object): key is keyof object {
  return key in obj;
}

export default isObjKey;
