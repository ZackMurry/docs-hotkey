import clickEl from '../actions/clickEl'

const typeValue = async (element: HTMLInputElement, val: string): Promise<void> => {
  clickEl(element)
  element.value = val

  // hitting tab to submit the input (not enter because it just doesn't work smh)
  const ke = new KeyboardEvent('keydown', {
    bubbles: true,
    cancelable: true,
    keyCode: 9
  })

  // https://stackoverflow.com/questions/779379/why-is-settimeoutfn-0-sometimes-useful
  await new Promise<void>(resolve =>
    setTimeout(() => {
      element.dispatchEvent(ke)
      resolve()
    }, 0)
  )
  return
}

export default typeValue
