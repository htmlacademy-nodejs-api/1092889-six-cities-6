import * as crypto from 'node:crypto';

const createSHA256 = (line: string, salt: string): string => crypto.createHmac('sha256',salt).update(line).digest('hex');

export {createSHA256};
