import {LoginUserDto} from '../user/dto/login-user.dto.js';
import {UserEntity} from '../user/index.js';

interface AuthService {
  authenticate(user: UserEntity):Promise<string>,
  verify(dto: LoginUserDto): Promise<UserEntity>
}

export {AuthService};
