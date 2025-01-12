import { endpoints } from './endpoints'

export default function Api() {
  const baseUrl = process.env.API_BASE

  return {
    get: async <T>(endpoint: string, options: RequestInit = {}): Promise<T> => {
      const fullUrl = `${baseUrl}${endpoint}`

      const response = await fetch(fullUrl, options)

      if (!response.ok) {
        throw new Error(`Request failed with status code ${response.status}`)
      }

      return response.json() as Promise<T>
    },
    post: async <T>(
      endpoint: string,
      data: Record<string, unknown>,
      headers: Record<string, string> = {}
    ): Promise<T> => {
      const fullUrl = `${baseUrl}${endpoint}`

      const response = await fetch(fullUrl, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          ...headers
        },
        body: JSON.stringify(data)
      })

      return response.json() as Promise<T>
    }
  }
}

const api = Api()

export const getLanguages = async () => {
  try {
    const response = await api.get<{ id: string; name: string }[]>(endpoints.languages)

    return response as any
  } catch (error) {
    return error
  }
}

export const createContents = async (data: any) => {
  try {
    const response = await api.post(endpoints.generateContents, data)

    return response as any
  } catch (error) {
    return error
  }
}

export const getContents = async () => {
  try {
    const response = await api.get<any>(endpoints.getContents)

    return response as any
  } catch (error) {
    return error
  }
}

export const getContent = async (id: string) => {
  try {
    const response = await api.get<any>(`${endpoints.getContent}${id}`)

    return response as any
  } catch (error) {
    return error
  }
}

export const getGeneratedContent = async (contentId: string, langId: string) => {
  try {
    const response = await api.get<any>(`${endpoints.getGeneratedContent}/${contentId}/languages/${langId}`)

    return response as any
  } catch (error) {
    return error
  }
}
