require('dotenv').config();
import 'reflect-metadata';
import logger from './configs/logger.config';
import app from './configs/express.config';

import dataSource from './configs/orm.config';
const PORT = process.env.PORT || 5000;


dataSource
  .initialize()
  .then(async () => {
    logger.info('Connected to database successfully');
    // try {
    //       await generatePermissions()
    //       await generateRoles()
    // } catch (error) {
    // }
    app.listen(PORT, () => {
      logger.info(`Server running at ${PORT}`);
    });
  })
  .catch((error) => logger.error(`The connection to the database failed with error: ${error}`));
