import { IncomingMessage } from 'http'
import { Socket } from 'socket.io'
import { Session, SessionData } from 'express-session'

import { UserData } from '../models/users'

export interface ServerToClientEvents {
  'status-change': (message: Record<string, any>) => void
}

/**
 * @todo Update during sockets implementation
 */
export interface ClientToServerEvents {
  'status-change': (message: Record<string, any>) => void
  'user-created': (message: Record<string, any>) => void
}

/**
 * @todo Update during sockets implementation
 */
export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  name: string;
  age: number;
}

type SessionInfo = { session: Session & Partial<SessionData>, user: UserData }

export type SocketRequest = IncomingMessage & SessionInfo
export type SocketObject = Socket<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>
export type SocketNext = (err?: Error) => void
