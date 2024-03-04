import {UserService} from './user-service.interface.js';
import {CreateUserDto} from './dto/create-user.dto.js';
import {DocumentType, types} from '@typegoose/typegoose';
import {Component} from '../../types/index.js';
import {UserEntity} from './user.entity.js';
import {inject, injectable} from 'inversify';
import {Logger} from '../../libs/logger/index.js';

@injectable()
class DefaultUserService implements UserService {

  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.UserModel) private readonly userModel: types.ModelType<UserEntity>) {
  }

  public async create(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>> {
    const user = new UserEntity(dto);
    user.setPassword(dto.password, salt);

    const result = await this.userModel.create(user);
    this.logger.info(`New user was created ${dto.email} with id: ${result.id}`);

    return result;
  }

  public async findByEmail(email: string): Promise<DocumentType<UserEntity> | null> {
    return this.userModel.findOne({email});
  }

  public async findById(id: string): Promise<DocumentType<UserEntity> | null> {
    return this.userModel.findById(id).exec();
  }

  public async findOrCreate(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>> {
    const user = await this.findByEmail(dto.email);

    if (user) {
      return user;
    }

    return this.create(dto, salt);
  }
}

export {DefaultUserService};

