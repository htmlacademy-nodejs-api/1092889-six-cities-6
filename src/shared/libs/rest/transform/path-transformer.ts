import {inject, injectable} from 'inversify';
import {Component} from '../../../types/index.js';
import {Logger} from '../../logger/index.js';
import {Config, RestSchema} from '../../config/index.js';
import {DEFAULT_STATIC_IMAGES, STATIC_RESOURCE_FIELDS} from './path-transformer.constant.js';
import {FilesDirectoryRoute} from '../constants/rest.constant.js';
import {getFullServerPath} from '../../../helpers/index.js';
import {ImageExtensions} from '../../../constants/index.js';

const isObject = (value: unknown): value is Record<string, object> => typeof value === 'object' && value !== null;


@injectable()
class PathTransformer {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.RestConfig) private readonly config: Config<RestSchema>
  ) {
    this.logger.info('PathTransformer created');
  }

  private hasDefaultImage(value: string) {
    return DEFAULT_STATIC_IMAGES.includes(value);
  }

  private isStaticProperty(property: string) {
    return STATIC_RESOURCE_FIELDS.includes(property);
  }

  public execute(data: Record<string, unknown>): Record<string, unknown> {
    const stack = [data];
    while (stack.length > 0) {

      const current = stack.pop();

      for (const key in current) {
        if(Object.hasOwn(current, key)) {
          const value = current[key];

          if (isObject(value)) {
            stack.push(value);
            continue;
          }
          if (this.isStaticProperty(key) && typeof value === 'string') {
            const staticPath = FilesDirectoryRoute.STATIC;
            const uploadPath = FilesDirectoryRoute.UPLOAD;
            const serverHost = this.config.get('HOST');
            const serverPort = this.config.get('PORT');

            const rootPath = this.hasDefaultImage(value) ? staticPath : uploadPath;
            current[key] = `${getFullServerPath(serverHost, serverPort)}${rootPath}/${value}`;
          }

          if(Array.isArray(current) && ImageExtensions.includes(current[0].split('.').pop())) {
            console.log();
            const staticPath = FilesDirectoryRoute.STATIC;
            const uploadPath = FilesDirectoryRoute.UPLOAD;
            const serverHost = this.config.get('HOST');
            const serverPort = this.config.get('PORT');
            current.map((image) => {
              const rootPath = this.hasDefaultImage(image) ? staticPath : uploadPath;
              current[key] = `${getFullServerPath(serverHost, serverPort)}${rootPath}/${value}`;
            });

          }
        }
      }
    }
    return data;
  }
}

export {PathTransformer};
