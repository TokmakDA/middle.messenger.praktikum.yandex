/* eslint-disable no-underscore-dangle */
import express from 'express';
import path from 'path';

const PORT = 3000;
const app = express();

// Раздача статических файлов из папки dist
// eslint-disable-next-line @typescript-eslint/naming-convention
const __dirname = path.dirname(new URL(import.meta.url).pathname);
app.use(express.static(path.join(__dirname, 'dist')));

// Маршрут для главной страницы
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Запуск сервера
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Сервер запущен на порту ${PORT}`);
});
