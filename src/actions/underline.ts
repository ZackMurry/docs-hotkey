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
  if (inverse === underlineElement.classList.contains('goog-toolbar-button-checked')) {
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
    if (menus[i]?.children[3]?.textContent != null && menus[i].children[3].textContent?.startsWith('Text')) {
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
            throw new Error('unable to strike through - 10 attempts, no success :(')
          }
        }, 50)
      })
      break
    }
  }
}

export const capitalize = async (config: string) => {
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
    if (menus[i]?.children[3]?.textContent != null && menus[i].children[3].textContent?.startsWith('Text')) {
      // console.log({i})
      clickEl(menus[i].children[3] as HTMLElement)
      await new Promise<void>(resolve => {
        var numTries = 0

        const tryCapitalize = (onSuccess: () => void) => {
          // Get strike through element and use it to find container
          const strks = document.getElementsByClassName(
            'docs-icon-img-container docs-icon-img docs-icon-editors-ia-strikethrough'
          )
          // console.log(strks)
          if (strks[0] && strks[0].parentElement?.parentElement?.parentElement?.parentElement) {
            // console.log('found')
            console.log('strikethrough found')
            console.log(strks[0].parentElement?.parentElement?.parentElement?.parentElement.children[8])
            const cap = strks[0].parentElement?.parentElement?.parentElement?.parentElement.children[8] as HTMLElement
            clickEl(cap)
            // clickEl(strks[0].parentElement?.parentElement as HTMLElement)
            const conf = config.toLowerCase()
            let el = null
            if (conf.includes('upper')) {
              el = document.querySelector('[aria-label="UPPERCASE u"]')
            } else if (conf.includes('lower')) {
              el = document.querySelector('[aria-label="lowercase l"]')
            } else if (conf.includes('title')) {
              el = document.querySelector('[aria-label="Title Case t"]')
            } else {
              console.log('invalid config for capitalize action: should contain upper, lower, or title')
              resolve()
              return
            }
            if (!el) {
              console.log('unable to find button for capitalization!')
              resolve()
              return
            }
            console.log(el)
            clickEl(el as HTMLElement)
            onSuccess()
            resolve()
          }
        }
        tryCapitalize(() => {
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
          tryCapitalize(() => {
            clearInterval(interval)
            numTries = -1
          })
          if (numTries >= 10) {
            clearInterval(interval)
            throw new Error('unable to change capitalization - 10 attempts, no success :(')
          }
        }, 50)
      })
      break
    }
  }
}
