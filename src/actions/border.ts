import findByIdAndClick from '../utils/findByIdAndClick'
import findByNameAndClick from '../utils/findByNameAndClick'
import findByTextsUnderSelector from '../utils/findByTextsUnderSelector'
import findByTitlesAndClick from '../utils/findByTitlesAndClick'
import clickEl from './clickEl'

export const toggleLeftBorder = async () => {
  await findByIdAndClick('docs-format-menu')

  const paragraphStyleSubMenuElement = await findByTextsUnderSelector('.goog-menuitem-label', [
    'Paragraph styles',
    '段落樣式'
  ])
  clickEl(paragraphStyleSubMenuElement)

  const borderAndBgcSubMenuElement = await findByTextsUnderSelector('.goog-menuitem-label', [
    'Borders and shading',
    '框線和底色'
  ])
  clickEl(borderAndBgcSubMenuElement)

  await findByTitlesAndClick(['左框線', 'Left border'])

  await findByNameAndClick('apply')
}
