import {CreateUserDto} from '../dto/create-user.dto.js';
import {DocumentType} from '@typegoose/typegoose';
import {UserEntity} from '../user.entity.js';
import {UpdateUserDto} from '../dto/update-user.dto.js';

interface UserService {
  create(dto: CreateUserDto, salt: string):Promise<DocumentType<UserEntity>>,
  findByEmail(email: string):Promise<DocumentType<UserEntity> | null>,
  findById(id: string):Promise<DocumentType<UserEntity> | null>,
  findOrCreate(dto: CreateUserDto, salt: string):Promise<DocumentType<UserEntity>>
  updateById(id: string, dto: UpdateUserDto):Promise<DocumentType<UserEntity> | null>
}

export {UserService};
