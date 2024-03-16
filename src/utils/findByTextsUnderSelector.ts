import retryWhenNil from './retryWhenNil'

export const findByTextsUnderSelectorOnce = (selector: string, texts: string[]): HTMLElement | null => {
  const itemArr = document.querySelectorAll(selector)
  try {
    for (let i = 0; i < itemArr.length; i++) {
      for (let j = 0; j < texts.length; j++) {
        if ((itemArr[i] as HTMLElement).innerText.includes(texts[j])) {
          return itemArr[i] as HTMLElement
        }
      }
    }
    return null
  } catch (e) {
    console.error(e)
    return null
  }
}

export const findByTextsUnderSelector = async (
  selector: string,
  texts: string[],
  options?: { maxRetry: number; retryDelay: number }
) => {
  const element = await retryWhenNil(
    () => findByTextsUnderSelectorOnce(selector, texts),
    options?.maxRetry,
    options?.retryDelay
  )
  if (!element) {
    throw new Error(`Element not found by texts under selector: selector(${selector}), texts(${JSON.stringify(texts)})`)
  }
  return element
}

export default findByTextsUnderSelector
