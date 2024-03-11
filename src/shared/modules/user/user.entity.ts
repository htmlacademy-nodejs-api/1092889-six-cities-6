import {defaultClasses, modelOptions, prop, PropType} from '@typegoose/typegoose';
import {ImageExtType, User, UserType} from '../../types/index.js';
import {createSHA256} from '../../helpers/index.js';
import {UserTypeValues} from '../../constants/index.js';
import {DEFAULT_AVATAR_FILE_NAME} from './constants/user.constant.js';


// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'users',
    timestamps: true
  }
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class UserEntity extends defaultClasses.TimeStamps {
  @prop({unique: true, required: true, default: '', type: String})
  public email: string;

  @prop({required: true, type: String})
  public name: string;

  @prop({required: false, default: DEFAULT_AVATAR_FILE_NAME, type: String})
  public avatar: ImageExtType;

  @prop({required: true, default:UserTypeValues[0], type: String})
  public type: UserType;

  @prop({required: true, default: '', type: String})
  private password?: string;

  @prop({type: () => String, default: []}, PropType.ARRAY)
  public favorites: string[];

  constructor(userData: User) {
    super();

    this.name = userData.name;
    this.email = userData.email;
    this.avatar = userData.avatar;
    this.type = userData.type;
  }

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }


  public verifyPassword(password: string, salt: string) {
    const hashPassword = createSHA256(password, salt);
    return hashPassword === this.password;
  }
}
