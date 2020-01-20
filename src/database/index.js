import Sequelize from 'sequelize';

import { File, Meetup, User, Subscription } from '../app/models';
import databaseConfig from '../config/database';

const models = [File, Meetup, User, Subscription];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map(model => model.init(this.connection));
    models.map(
      model => model.associate && model.associate(this.connection.models)
    );
  }
}

export default new Database();
