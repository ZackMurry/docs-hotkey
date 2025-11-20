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
  const textBtn: HTMLElement | null = document.querySelector('[aria-label="Text s"]')
  if (!textBtn) {
    throw new Error('unable to format: text button now found')
  }
  clickEl(textBtn)
  await new Promise<void>(resolve => {
    var numTries = 0

    const tryStrikethrough = (onSuccess: () => void) => {
      const strk: HTMLElement | null = document.querySelector('[aria-label="Strikethrough k"]')
      if (!strk) {
        console.log('unable to find Strikethrough k button')
        resolve()
        return
      }
      clickEl(strk)
      onSuccess()
      resolve()
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
}

export const capitalize = async (config: string) => {
  const formatBtn = document.getElementById('docs-format-menu')
  if (!formatBtn) {
    throw new Error('unable to format')
  }
  clickEl(formatBtn)
  const textBtn: HTMLElement | null = document.querySelector('[aria-label="Text s"]')
  if (!textBtn) {
    throw new Error('unable to format: text button now found')
  }
  clickEl(textBtn)
  await new Promise<void>(resolve => {
    var numTries = 0

    const tryCapitalize = (onSuccess: () => void) => {
      // Get strike through element and use it to find container
      const cap: HTMLElement | null = document.querySelector('[aria-label="Capitalization 1"]')
      if (!cap) {
        console.log('unable to find Capitalization 1 button')
        resolve()
        return
      }
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
        console.log('unable to change capitalization - 10 attempts, no success :(')
        resolve()
        return
      }
      if (!el) {
        console.log('unable to find button for capitalization!')
        resolve()
        return
      }
      // console.log(el)
      clickEl(el as HTMLElement)
      onSuccess()
      resolve()
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
}
