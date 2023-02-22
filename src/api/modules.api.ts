import getAxiosInstance from 'src/api/axios-instanse'
import { IModule, IModuleInitial } from 'src/types/modules'

export const addModule = (payload: IModuleInitial) => getAxiosInstance().post('/modules', payload)
export const updateModule = (moduleId, data: Partial<IModule>) => getAxiosInstance().patch(`/modules/${moduleId}`, data)
