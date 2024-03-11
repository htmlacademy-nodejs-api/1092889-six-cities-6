import {Request} from 'express';
import {RequestParams} from '../../../libs/rest/index.js';
import {RequestBody} from '../../../libs/rest/index.js';
import {CreateUserDto} from '../dto/create-user.dto.js';

type CreateUserRequest = Request<RequestParams, RequestBody, CreateUserDto>;

export {CreateUserRequest};
