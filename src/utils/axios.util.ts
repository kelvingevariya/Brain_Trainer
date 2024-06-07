import { AxiosResponse } from 'axios'

/**
 * Gets `data` property from axios response.
 */
export const getAxiosResponseData = (response: AxiosResponse) => response.data
