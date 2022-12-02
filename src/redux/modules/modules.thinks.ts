import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from 'src/api/axios-instanse'

export const fetchModules = createAsyncThunk('modules/fetchModules', async () => {
  const modules = await axiosInstance.get('/modules')
  return modules.data
})
