const fs = require('fs');
const path = require('path');

// Путь к файлам сборки
const jsDir = path.join(__dirname, 'build', 'static', 'js');
const cssDir = path.join(__dirname, 'build', 'static', 'css');

// Путь к index.php
const indexPhpPath = path.join(__dirname, '..', 'index.php');

// Функция для получения последней версии файла
function getLatestFile(directory, prefix, extension) {
    const files = fs.readdirSync(directory);
    const file = files.find(file => file.startsWith(prefix) && file.endsWith(extension));
    return file || null;
}

// Получаем последний js и css файлы
const jsFile = getLatestFile(jsDir, 'main', '.js');
const cssFile = getLatestFile(cssDir, 'main', '.css');

if (jsFile && cssFile) {
    // Читаем содержимое index.php
    fs.readFile(indexPhpPath, 'utf8', (err, data) => {
        if (err) {
            return console.error('Ошибка при чтении index.php:', err);
        }

        // Регулярные выражения для замены строк с CSS и JS
        const updatedCss = data.replace(/<link href="\.\/assets\/react\/static\/css\/main\.\w+\.css/g, `<link href="./assets/react/static/css/${cssFile}`);
        const updatedJs = updatedCss.replace(/<script defer="defer" src="\.\/assets\/react\/static\/js\/main\.\w+\.js/g, `<script defer="defer" src="./assets/react/static/js/${jsFile}`);

        // Перезаписываем index.php с обновленными ссылками
        fs.writeFile(indexPhpPath, updatedJs, 'utf8', (err) => {
            if (err) {
                return console.error('Ошибка при записи index.php:', err);
            }
            console.log('index.php успешно обновлен!');
        });
    });
} else {
    console.error('Не удалось найти сгенерированные файлы main.js или main.css');
}