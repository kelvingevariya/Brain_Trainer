import { RequestHandler, NextFunction, Request, Response } from 'express'
import { SocketNext, SocketObject } from '../types/libs/sockets'

/**
 * Wrapper which converts ordinary middleware to socket one .
 */
export const wrap = (middleware: RequestHandler) =>
  (socket: SocketObject, next: SocketNext) => middleware(socket.request as Request, {} as Response, next as NextFunction)
