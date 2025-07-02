import clickEl from './clickEl'

export const searchMenu = (config: string) => {
  const btn = document.querySelector(`[aria-label="Insert ${config}"]`)
  if (!btn) {
    throw new Error('Search menu item not found!')
  }
  clickEl(btn as HTMLElement)
}
