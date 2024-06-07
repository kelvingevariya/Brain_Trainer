import { Server } from 'socket.io'

import { RedisModel } from '../models'

import { SocketObject, SocketRequest } from '../types/libs/sockets'

/**
 * Server instance.
 */
export let socketInstance: Server

/**
 * Builds socket object based on given `io` object.
 */
export const socketBuilder = (io: Server) => {
  socketInstance = io

  io.on('connection', (socket: SocketObject) => {

    const { user } = socket.request as SocketRequest

    if (user) {
      RedisModel.setUserSocketId(user.id, socket.id)
    }
    socket.on('user-created', (data) => {
      if(data?.id){
        RedisModel.setUserSocketId(data.id, socket.id)
      }
    })
  })
}
