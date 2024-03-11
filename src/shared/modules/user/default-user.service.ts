import {inject, injectable} from 'inversify';
import {DocumentType, types} from '@typegoose/typegoose';
import {UserService} from './types/user-service.interface.js';
import {CreateUserDto} from './dto/create-user.dto.js';
import {Component} from '../../types/index.js';
import {UserEntity} from './user.entity.js';
import {Logger} from '../../libs/logger/index.js';
import {UpdateUserDto} from './dto/update-user.dto.js';
import {DEFAULT_AVATAR_FILE_NAME} from './constants/user.constant.js';

@injectable()
class DefaultUserService implements UserService {

  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.UserModel) private readonly userModel: types.ModelType<UserEntity>) {
  }

  public async create(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>> {
    const user = new UserEntity({...dto, avatar: DEFAULT_AVATAR_FILE_NAME});
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

  updateById(id: string, dto: UpdateUserDto): Promise<DocumentType<UserEntity> | null> {
    return this.userModel.findByIdAndUpdate(id, dto, {new: true}).exec();
  }

}

export {DefaultUserService};

