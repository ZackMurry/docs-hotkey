import retryWhenNil from './retryWhenNil'

const findById = async (id: string, options?: { maxRetry: number; retryDelay: number }) => {
  const element = await retryWhenNil(() => document.getElementById(id), options?.maxRetry, options?.retryDelay)
  if (!element) {
    throw new Error(`Element not found by id: ${id}`)
  }
  return element
}

export default findById
