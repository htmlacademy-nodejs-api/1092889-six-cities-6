import convict from 'convict';
import validator from 'convict-format-with-validator';

convict.addFormats(validator);

type RestSchema = {
  PORT: number,
  DB_ADDRESS: string,
  SALT: string,
  DB_USER: string,
  DB_PASSWORD: string,
  DB_PORT: string,
  DB_NAME: string,
  UPLOAD_DIRECTORY: string,
  JWT_SECRET: string,
  HOST: string,
  STATIC_DIRECTORY: string
}

const configRestSchema = convict<RestSchema>({
  PORT: {
    doc: 'Port for incoming connections',
    format: 'port',
    env: 'PORT',
    default: 4000
  },
  DB_ADDRESS: {
    doc: 'Ip address of the Database',
    format: 'ipaddress',
    env: 'DB_ADDRESS',
    default: '127.0.0.1'
  },
  SALT: {
    doc: 'Salt for password hashing',
    format: String,
    env: 'SALT',
    default: null
  },
  DB_USER: {
    doc: 'Username for database connection',
    format: String,
    env: 'DB_USER',
    default: null
  },
  DB_PASSWORD: {
    doc: 'Password for database connection',
    format: String,
    env: 'DB_PASSWORD',
    default: null
  },
  DB_PORT: {
    doc: 'Port for database connection',
    format: 'port',
    env: 'DB_PORT',
    default: '27017'
  },
  DB_NAME: {
    doc: 'Database name',
    format: String,
    env: 'DB_NAME',
    default: 'six-cities'
  },
  UPLOAD_DIRECTORY: {
    doc: 'Directory for uploaded files',
    format: String,
    env: 'UPLOAD_DIRECTORY',
    default: null
  },
  JWT_SECRET: {
    doc: 'Secret for JWT signing',
    format: String,
    env: 'JWT_SECRET',
    default: null
  },
  HOST: {
    doc: 'Host where service launched',
    format: String,
    emv: 'HOST',
    default: 'localhost'
  },
  STATIC_DIRECTORY: {
    doc: 'Directory for static files',
    format: String,
    env: 'STATIC_DIRECTORY',
    default: 'static'
  }
});

export {RestSchema, configRestSchema};
