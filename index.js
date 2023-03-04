const server = require('./app');
const { conn } = require('./src/database.js');

const port = 3001;

conn.sync({ force: false }).then(() => {
  server.listen(port, () => {
    console.log(`%s listening at http://localhost:${port}`);
  })
});
