export const errorToMessage = (error: any) => {
  if (!error) return ''
  if (typeof error === 'string') return error

  if (error.isAxiosError) {
    if (!error.response) return error.message
    if (error.response.data) {
      if (error.response.data.detail) return error.response.data.detail
      if (error.response.data.title) return error.response.data.title
      if (error.response.data.error?.message) return error.response.data?.error?.message
    }
    return `${error.response.status} ${error.response.message}`
  }

  return error.message
}

export const isNetworkError = (error: any) => {
  if (error instanceof Error) return error.message.toLowerCase() === 'network error'
  return false
}

export const isApiClientError = (error: any) => {
  if (error.isAxiosError && error.response) return error.response.status.toString()[0] === '4'
  return false
}

export const isApiServerError = (error: any) => {
  if (error.isAxiosError && error.response) return error.response.status.toString()[0] === '5'
  return false
}

export const isApiError = (error: any, statusCode?: number) => {
  if (error?.isAxiosError && error?.response) {
    if (statusCode) return error.response.status === statusCode
    return true
  }
  return false
}
