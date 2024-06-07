type User = unknown
type DoneCallback = (err: Error | null, user: User) => void

/**
 * Serialize user handler for passport.
 */
export const withSerializeStrategy = (user: User, done: DoneCallback): void => {
  done(null, user)
}

/**
 * Deserialize user handler for passport.
 */
export const withDeserializeStrategy = (user: User, done: DoneCallback): void => {
  done(null, user)
}
