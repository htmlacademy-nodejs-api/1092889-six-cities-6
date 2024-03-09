import {Request} from 'express';
import {RequestParams} from '../../../libs/rest/types/request.params.type.js';
import {RequestBody} from '../../../libs/rest/types/request-body.type.js';
import {UpdateUserDto} from '../dto/update-user.dto.js';

type FavoriteUserRequest = Request<RequestParams, RequestBody, UpdateUserDto>;

export {FavoriteUserRequest};
