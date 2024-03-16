import clickEl from '../actions/clickEl'
import retryWhenNil from './retryWhenNil'

const findByNameAndClick = async (name: string, options?: { maxRetry: number; retryDelay: number }) => {
  const element = await retryWhenNil(
    () => document.querySelector(`[name='${name}']`) as HTMLElement,
    options?.maxRetry,
    options?.retryDelay
  )
  if (!element) {
    throw new Error(`Element not found by name: ${name}`)
  }
  clickEl(element)
}

export default findByNameAndClick
