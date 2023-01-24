import getAxiosInstance from 'src/api/axios-instanse'
import { IModuleInitial } from 'src/types/modules'

export const addModule = (payload: IModuleInitial) => getAxiosInstance().post('/modules', payload)
