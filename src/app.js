import express from 'express';
import routes from './routes';

import './database';

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
  }

  routes() {
    this.server.get('/', (req, res) => {
      res.json({ msg: 'teste' });
    });
    this.server.use(routes);
  }
}

export default new App().server;
