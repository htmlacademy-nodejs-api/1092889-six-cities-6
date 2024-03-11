import {Request} from 'express';
import {RequestParams} from '../../../libs/rest/index.js';
import {RequestBody} from '../../../libs/rest/index.js';
import {LoginUserDto} from '../dto/login-user.dto.js';

type LoginUserRequest = Request<RequestParams, RequestBody, LoginUserDto>;

export {LoginUserRequest};
