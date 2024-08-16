function cloneDeep<T>(obj: T): T {
  // Проверка на null или примитивный тип
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  // Проверка на массив и создание нового массива с рекурсивным копированием элементов
  if (Array.isArray(obj)) {
    const arrCopy = obj.map((item) => cloneDeep(item));
    return arrCopy as unknown as T;
  }

  // Создание нового объекта с рекурсивным копированием свойств
  const objCopy: { [K in keyof T]: T[K] } = {} as T;
  Object.keys(obj).forEach((k) => {
    const key = k as keyof T;
    objCopy[key] = cloneDeep(obj[key]);
  });

  return objCopy;
}

export default cloneDeep;
