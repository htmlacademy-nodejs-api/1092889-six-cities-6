import convict from 'convict';
import validator from 'convict-format-with-validator';

convict.addFormats(validator);

type RestSchema = {
  PORT: number,
  DB_ADDRESS: string,
  SALT: string
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
  }
});

export {RestSchema, configRestSchema};
