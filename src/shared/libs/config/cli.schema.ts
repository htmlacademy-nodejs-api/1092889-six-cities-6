import convict from 'convict';
import validator from 'convict-format-with-validator';

convict.addFormats(validator);

type CliSchema = {
  DB_ADDRESS: string,
  SALT: string,
  DB_USER: string,
  DB_PASSWORD: string,
  DB_PORT: string,
  DB_NAME: string,
  DEFAULT_USER_PASSWORD: string
}

const configCliSchema = convict<CliSchema>({
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
  DEFAULT_USER_PASSWORD: {
    doc: 'Default password for generated users',
    format: String,
    env: 'DEFAULT_USER_PASSWORD',
    default: '123456'
  }
});

export {CliSchema, configCliSchema};
