import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../api/axios-instanse'
import { routes } from '../routes/paths'

export const fetchModules = createAsyncThunk(
  'modules/fetchModules',
  async () => {
    const modules = await axiosInstance.get(routes.get())
    return modules.data
  }
)
