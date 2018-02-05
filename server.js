const app = require('express')();

let settings = require('./server/config/settings');

require('./server/config/database')(settings);
require('./server/config/express')(app);
require('./server/routers')(app);
require('./server/config/passport')(app);

app.listen(settings.port, () => {
    console.log(`Server listening on port: ${settings.port}.`);
});
