import clickEl from './clickEl'

export const executeAddon = async (config: string) => {
  const menubarElement = document.getElementById('docs-menubar')
  if (!menubarElement) {
    throw new Error('unable to execute add-on')
  }
  const parts = config.split('.')
  if (parts.length !== 2) {
    throw new Error('invalid add-on protocol')
  }
  let addon: HTMLCollection | null = null
  for (let i = 0; i < menubarElement.children.length; i++) {
    const menu = menubarElement.children[i] as HTMLElement
    if (menu.innerHTML === 'Extensions') {
      clickEl(menu)
      addon = document.getElementsByClassName('docs-menu-attached-button-above')[0]?.children as HTMLCollection
      break
    }
  }
  if (!addon) {
    throw new Error('unable to execute add-on')
  }
  for (let j = 0; j < addon.length; j++) {
    if ((addon[j]?.children[0] as HTMLElement)?.innerText === parts[0]) {
      clickEl(addon[j].children[0] as HTMLElement)
      await new Promise<void>(resolve => {
        var interval = setInterval(() => {
          const popups = document.getElementsByClassName(
            'goog-menu goog-menu-vertical docs-material ia-menu apps-menu-hide-mnemonics'
          )
          outer: for (let k = 0; k < popups.length; k++) {
            if (window.getComputedStyle(popups[k]).display === 'block') {
              for (let l = 0; l < popups[k].children.length; l++) {
                if ((popups[k]?.children[l]?.children[0] as HTMLElement | null)?.innerText === parts[1]) {
                  console.log(popups[k].children[l])
                  clearInterval(interval)
                  clickEl(popups[k].children[l] as HTMLElement)
                  resolve()
                  break outer
                }
              }
            }
          }
        }, 50)
      })
      break
    }
  }
}
