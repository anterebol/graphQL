Очень кратко, возможно не полно и не обязательно к просмотру: https://youtu.be/2IvoaOoWtAI (в видео оговорка используйте git checkout:))

Для того чтобы запустить приложение, его для начала нужно копировать с Git. Дальше непосредственно перейти в ветку develop открыть папку, установить зависимости через команду "npm i" и запустить сервер (можно запустить в production режиме "npm run start" или dev "npm run start:dev"). 
В проекте имеется файл .env в котором можно указать PORT(на этом порту будет запущено приложение), DEPTH(отвечает за глубину погружения GraPhql), jwt(в случае падения сервера можно будет перезапустить его без повторного "логина"). 
Дальше после запуска сервера открываем браузер http://localhost:{PORT}/graphql проверяем непосредственно сами запросы и мутации. 
Просьба отнестить к проверке с адекватность и уважением труда других учащихся. 
В случае возникнвения вопросов telegram(https://t.me/anterebol) 
Благодарю за проверку!
