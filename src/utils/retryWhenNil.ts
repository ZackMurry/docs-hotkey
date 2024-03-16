import sleep from './sleep'

const retryWhenNil = async <T>(fn: () => T, maxTryTimes: number = 10, retryDelay: number = 100): Promise<T> => {
  let response: any
  let triedNum = 0
  while (triedNum < maxTryTimes && !response) {
    try {
      response = await fn()
    } catch (e) {
      console.error(e)
      response = null
    }
    if (!response) {
      await sleep(retryDelay)
    }
    triedNum++
  }
  return response
}

export default retryWhenNil
