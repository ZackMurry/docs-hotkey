import clickEl from '../actions/clickEl'
import findById from './findById'

const findByIdAndClick = async (id: string, options?: { maxRetry: number; retryDelay: number }) => {
  const element = await findById(id, options)
  if (!element) {
    throw new Error(`Element not found by id: ${id}`)
  }
  clickEl(element)
}

export default findByIdAndClick
