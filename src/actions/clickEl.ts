export const dispatchMouseEvent = (target: HTMLElement, event: string) => {
  if (!target) {
    return false
  }
  var e = document.createEvent('MouseEvents')
  e.initEvent.apply(e, [event, true, true])
  target.dispatchEvent(e)
  return true
}

const clickEl = (el: HTMLElement) => {
  dispatchMouseEvent(el, 'mouseover')
  dispatchMouseEvent(el, 'mousedown')
  dispatchMouseEvent(el, 'click')
  dispatchMouseEvent(el, 'mouseup')
}

export default clickEl
