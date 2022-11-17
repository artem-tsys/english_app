interface IRoutes {
  get: () => string
  post: (id: string | number) => string
}

export const routes: IRoutes = {
  get: () => `/modules`,
  post: (id) => `/modules/${id}`,
}
