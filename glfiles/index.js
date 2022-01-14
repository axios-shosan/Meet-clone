const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express();
const apiRoutes = require('./routes/api');
const fileRoute = require('./routes/file');


app.use(bodyParser({defer: true}));
app.use(bodyParser.json())
app.use(cors())
app.use('/api', apiRoutes);
app.use('/file', fileRoute);

app.listen(3000, () => {
  console.log('Server started on port : ' + 3000);
});