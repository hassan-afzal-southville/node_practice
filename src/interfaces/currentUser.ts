import {Request} from 'express';
export interface currentRequest extends Request {
    user: any
}