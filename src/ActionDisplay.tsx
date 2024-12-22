import React, { FC, ChangeEvent } from 'react'
import { Checkbox, Flex, IconButton, Input, Select, Tooltip } from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'

type ActionType =
  | 'b' // bold
  | 'u' // underline
  | 'hl' // highlight
  | 'i' // italicize
  | 'tc' // text color
  | 'ff' // font family
  | 'fw' // font weight
  | 'fs' // font size
  | 'hd' // heading
  | 'cl' // clear
  | 'al' // align
  | 'in' // indent
  | 'st' // strikethrough
  | 'cp' // capitalization (lower, upper, title)
  | 'er' // emoji reaction
  | 'bl' // bullet list
  | 'ls' // list spacing
  | 'ub' // unbold
  | 'uu' // ununderline
  | 'ui' // unitalicize
  | 'ht' // toggle highlight
  | 'tt' // toggle text color
  | 'lst' // list spacing toggle
  | 'ex' // execute add-on
export const getActionType = (s: string): ActionType =>
  (s.indexOf('#') === -1 ? s : s.substring(0, s.indexOf('#'))) as ActionType
export const getActionConfig = (s: string): string => (s.indexOf('#') !== -1 ? s.substring(s.indexOf('#') + 1) : '')

interface Props {
  value: string
  onChange: (value: string) => void
  onDelete: () => void
}

const ActionDisplay: FC<Props> = ({ value, onChange, onDelete }) => {
  const type = value ? getActionType(value) : undefined
  const config = getActionConfig(value)

  const onTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const type = e.target.value as ActionType
    let newConfig = ''
    if (type === 'hl') {
      newConfig = 'yellow'
    } else if (type === 'tc') {
      newConfig = 'black'
    } else if (type === 'ff') {
      newConfig = 'Arial'
    } else if (type === 'fw') {
      newConfig = 'Normal'
    } else if (type === 'fs') {
      newConfig = '11'
    } else if (type === 'hd') {
      newConfig = 'Normal text'
    } else if (type === 'al') {
      newConfig = 'left'
    } else if (type === 'in') {
      newConfig = '1'
    } else if (type === 'cp') {
      newConfig = 'uppercase'
    } else if (type === 'er') {
      newConfig = 'check-mark'
    } else if (type === 'bl') {
      newConfig = '1'
    } else if (type === 'ls') {
      newConfig = 'after'
    }
    onChange(type + (newConfig.length ? `#${newConfig}` : ''))
  }

  const onConfigChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value: val } = e.target
    onChange(type + (val.length ? `#${val}` : ''))
  }

  const onToggleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (type === 'hl') {
      onChange(`ht#${config}`)
    } else if (type === 'ht') {
      onChange(`hl#${config}`)
    } else if (type === 'tc') {
      onChange(`tt#${config}`)
    } else if (type === 'tt') {
      onChange(`tc#${config}`)
    } else if (type === 'ls') {
      onChange(`lst#${config}`)
    } else if (type === 'lst') {
      onChange(`ls#${config}`)
    } else {
      onChange(type + (e.target.checked ? '#toggle' : ''))
    }
  }

  const onInvertChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (type === 'u') {
      onChange(`uu${config}`)
    } else if (type === 'uu') {
      onChange(`u${config}`)
    } else if (type === 'i') {
      onChange(`ui${config}`)
    } else if (type === 'ui') {
      onChange(`i${config}`)
    } else if (type === 'b') {
      onChange(`ub${config}`)
    } else if (type === 'ub') {
      onChange(`b${config}`)
    }
  }

  let normalizedType = type
  if (type === 'ht') normalizedType = 'hl'
  else if (type === 'tt') normalizedType = 'tc'
  else if (type === 'lst') normalizedType = 'ls'
  else if (type === 'ub') normalizedType = 'b'
  else if (type === 'ui') normalizedType = 'i'
  else if (type === 'uu') normalizedType = 'u'

  const isToggleDisabled = type === 'ub' || type === 'uu' || type === 'ui'

  return (
    <Flex py='3px' alignItems='center'>
      {
        <Select size='sm' value={normalizedType} placeholder='Select action type' onChange={onTypeChange}>
          <option value='b'>Bold</option>
          <option value='u'>Underline</option>
          <option value='hl'>Highlight</option>
          <option value='tc'>Text Color</option>
          <option value='i'>Italicize</option>
          <option value='ff'>Font</option>
          <option value='fs'>Font Size</option>
          <option value='fw'>Font Weight</option>
          <option value='hd'>Heading</option>
          <option value='al'>Align</option>
          <option value='in'>Indent</option>
          <option value='st'>Strikethrough</option>
          <option value='cp'>Capitalize</option>
          <option value='er'>Emoji Reaction</option>
          <option value='bl'>Bullet List</option>
          <option value='ls'>List Space</option>
          <option value='cl'>Unstyle</option>
          <option value='ex'>Execute Add-on</option>
        </Select>
      }
      {(type === 'ff' ||
        type === 'fw' ||
        type === 'hl' ||
        type === 'ht' ||
        type === 'tc' ||
        type === 'tt' ||
        type === 'hd' ||
        type === 'al' ||
        type === 'cp' ||
        type === 'er' ||
        type === 'ls' ||
        type === 'lst' ||
        type === 'ex') && <Input size='sm' ml='3px' value={config} onChange={onConfigChange} />}
      {(type === 'fs' || type === 'in' || type === 'bl') && (
        <Input size='sm' ml='3px' type='number' value={config} onChange={onConfigChange} />
      )}
      {(type === 'b' || type === 'ub' || type === 'u' || type === 'uu' || type === 'i' || type === 'ui') && (
        <Tooltip label='Invert' shouldWrapChildren>
          <Checkbox
            size='md'
            colorScheme='red'
            ml='8px'
            isChecked={type.startsWith('u') && type !== 'u'}
            onChange={onInvertChange}
          />
        </Tooltip>
      )}
      {(type === 'b' ||
        type === 'ub' ||
        type === 'u' ||
        type === 'uu' ||
        type === 'i' ||
        type === 'ui' ||
        type === 'hl' ||
        type === 'ht' ||
        type === 'tc' ||
        type === 'tt' ||
        type === 'ls' ||
        type === 'lst') && (
        <Tooltip label={isToggleDisabled ? 'Toggle (disabled due to invert)' : 'Toggle'} shouldWrapChildren>
          <Checkbox
            size='md'
            ml='8px'
            disabled={isToggleDisabled}
            isChecked={config === 'toggle' || type === 'ht' || type === 'tt' || type === 'lst'}
            onChange={onToggleChange}
          />
        </Tooltip>
      )}
      <IconButton
        bg='transparent'
        size='sm'
        ml='3px'
        aria-label='Delete action'
        icon={<CloseIcon fontSize='12px' color='red.400' />}
        onClick={onDelete}
      />
    </Flex>
  )
}

export default ActionDisplay
