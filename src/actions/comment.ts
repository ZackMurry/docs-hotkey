import clickEl, {dispatchMouseEvent} from './clickEl'

export const reactWithEmoji = (emoji: string) => {
  console.log(`REACTING WITH ${emoji}`)
  const bubbleButtonContainer = document.getElementById('docs-instant-bubble')
  if (
    !bubbleButtonContainer?.children[0]?.children[0]?.children[1]?.children[0]
      ?.children[0]
  ) {
    throw new Error('unable to find emoji react button!')
  }
  const emojiReactButton = bubbleButtonContainer.children[0].children[0]
    .children[1].children[0].children[0] as HTMLElement
  console.log(emojiReactButton)
  clickEl(emojiReactButton)
  const emojiTextBoxElements = document.getElementsByClassName(
    'appsElementsEmojipickerSearchInput'
  )
  if (!emojiTextBoxElements || !emojiTextBoxElements[0]) {
    throw new Error('unable to open emoji dialog!')
  }
  setTimeout(() => {
    const emojiTextBox = emojiTextBoxElements[0] as HTMLInputElement
    emojiTextBox.value = emoji
    emojiTextBox.dispatchEvent(new Event('input', {bubbles: true}))
    setTimeout(() => {
      const topEmojiListContainers = document.getElementsByClassName(
        'appsElementsEmojipickerListEmojiList'
      )
      if (!topEmojiListContainers || topEmojiListContainers.length === 0) {
        throw new Error('unable to find emojis!')
      }
      let topEmojiListContainer = topEmojiListContainers[1]
      if (
        topEmojiListContainer.classList.contains(
          'appsElementsEmojipickerListBrowseList'
        )
      ) {
        console.warn(
          'Not the write emoji list! A UI change has likely occurred'
        )
        topEmojiListContainer = topEmojiListContainers[0]
      }
      if (
        !topEmojiListContainer ||
        !topEmojiListContainer.children.length ||
        !topEmojiListContainer.children[0]
      ) {
        throw new Error('unable to find top emoji result!')
      }
      const topEmoji = topEmojiListContainer.children[0].children[0].children[0]
        .children[0] as HTMLButtonElement
      console.log(topEmoji)
      dispatchMouseEvent(topEmoji, 'mouseenter')
      topEmoji.focus()
      topEmoji.dispatchEvent(new Event('click'))
      clickEl(topEmoji)
    }, 0)
  }, 0)
}
