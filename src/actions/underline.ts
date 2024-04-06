import clickEl from './clickEl'

export const toggleUnderline = () => {
  const underlineElement = document.getElementById('underlineButton')
  if (!underlineElement) {
    throw new Error('unable to underline')
  }
  clickEl(underlineElement)
}

export const underline = (inverse: boolean = false) => {
  const underlineElement = document.getElementById('underlineButton')
  if (!underlineElement) {
    throw new Error('unable to underline')
  }
  if (
    inverse ===
    underlineElement.classList.contains('goog-toolbar-button-checked')
  ) {
    toggleUnderline()
  }
}

export const strikethrough = async () => {
  const formatBtn = document.getElementById('docs-format-menu')
  if (!formatBtn) {
    throw new Error('unable to format')
  }
  clickEl(formatBtn)
  const menus = document.getElementsByClassName(
    'goog-menu goog-menu-vertical docs-material ia-menu ia-primary-menu ia-has-icon apps-menu-hide-mnemonics'
  )
  for (let i = 0; i < menus.length; i++) {
    // console.log(menus[i]?.children[3]?.children[0]?.children[1].textContent)
    // console.log(menus[i]?.children[3]?.textContent)
    if (
      menus[i]?.children[3]?.textContent != null &&
      menus[i].children[3].textContent?.startsWith('Text')
    ) {
      // console.log({i})
      clickEl(menus[i].children[3] as HTMLElement)
      await new Promise<void>(resolve => {
        var numTries = 0

        const tryStrikethrough = (onSuccess: () => void) => {
          const strks = document.getElementsByClassName(
            'docs-icon-img-container docs-icon-img docs-icon-editors-ia-strikethrough'
          )
          // console.log(strks)
          if (strks[0] && strks[0].parentElement?.parentElement) {
            // console.log('found')
            clickEl(strks[0].parentElement?.parentElement as HTMLElement)
            onSuccess()
            resolve()
          }
        }
        tryStrikethrough(() => {
          numTries = -1
        })
        if (numTries < 0) {
          resolve()
          return
        }
        var interval = setInterval(() => {
          if (numTries < 0) {
            resolve()
            return
          }
          numTries++
          tryStrikethrough(() => {
            clearInterval(interval)
            numTries = -1
          })
          if (numTries >= 10) {
            clearInterval(interval)
            throw new Error(
              'unable to strike through - 10 attempts, no success :('
            )
          }
        }, 50)
      })
      break
    }
  }
}
