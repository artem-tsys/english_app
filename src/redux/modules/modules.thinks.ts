import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from 'src/api/axios-instanse'

export const fetchModules = createAsyncThunk('modules/fetchModules', async () => {
  const modules = await axiosInstance.get('/modules').catch((err) => {
    if (err.response.data) {
      throw new Error(err.response.data.message)
    }
    throw new Error(err.message)
  })
  return modules.data ?? modules
})
