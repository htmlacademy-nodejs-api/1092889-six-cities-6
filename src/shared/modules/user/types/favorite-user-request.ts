import {Request} from 'express';
import {RequestBody} from '../../../libs/rest/index.js';
import {UpdateUserDto} from '../dto/update-user.dto.js';
import {ParamOfferId} from '../../../types/param-offerid.type.js';

type FavoriteUserRequest = Request<ParamOfferId, RequestBody, UpdateUserDto>;

export {FavoriteUserRequest};
