export const ConnectionLogger = (serviceName: string) => {
  /**
   * Logs connection success for given `serviceName`.
   */
  const logConnectionSuccess = () => console.log(`${serviceName} connection has been established successfully.`)

  /**
   * Logs connection failure for given `serviceName` and `error`.
   */
  const logConnectionFailure = (error: Error) => console.error(`${serviceName} connection error: ${error.message}`)

  return {
    logConnectionSuccess,
    logConnectionFailure
  }
}
