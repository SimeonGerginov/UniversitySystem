let settings = require('./server/config/settings');

Promise.resolve()
   .then(() => require('./server/config/database')(settings))
   .then(() => require('./server/config/app').init())
   .then((app) => {
     app.listen(settings.port, () => {
        console.log(`Server listening on port: ${settings.port}.`);
     });

   });
