import clickEl from '../actions/clickEl'
import retryWhenNil from './retryWhenNil'

const findByTitlesAndClick = async (titles: string[], options?: { maxRetry: number; retryDelay: number }) => {
  const element = await retryWhenNil(
    () => titles.map(title => document.querySelector(`[title='${title}']`)).find(ele => !!ele),
    options?.maxRetry,
    options?.retryDelay
  )
  if (!element) {
    throw new Error(`Element not found by titles: ${titles}`)
  }
  clickEl(element as HTMLElement)
}

export default findByTitlesAndClick
