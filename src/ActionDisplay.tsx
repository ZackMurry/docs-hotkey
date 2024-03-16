import React, {FC, ChangeEvent} from 'react'
import {
  Checkbox,
  Flex,
  IconButton,
  Input,
  Select,
  Tooltip,
} from '@chakra-ui/react'
import {CloseIcon} from '@chakra-ui/icons'

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
  | 'er' // emoji reaction
  | 'ub' // unbold
  | 'uu' // ununderline
  | 'ui' // unitalicize
  | 'ht' // toggle highlight
  | 'tt' // toggle text color
  | 'qu' // quote
  | 'ex' // execute add-on
export const getActionType = (s: string): ActionType =>
  (s.indexOf('#') === -1 ? s : s.substring(0, s.indexOf('#'))) as ActionType
export const getActionConfig = (s: string): string =>
  s.indexOf('#') !== -1 ? s.substring(s.indexOf('#') + 1) : ''

interface Props {
  value: string
  onChange: (value: string) => void
  onDelete: () => void
}

const ActionDisplay: FC<Props> = ({value, onChange, onDelete}) => {
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
    } else if (type === 'er') {
      newConfig = 'check-mark'
    }
    onChange(type + (newConfig.length ? `#${newConfig}` : ''))
  }

  const onConfigChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {value: val} = e.target
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
    } else {
      onChange(type + (e.target.checked ? '#toggle' : ''))
    }
  }

  return (
    <Flex py="3px" alignItems="center">
      {
        <Select
          size="sm"
          value={type === 'ht' ? 'hl' : type === 'tt' ? 'tc' : type}
          placeholder="Select action type"
          onChange={onTypeChange}>
          <option value="b">Bold</option>
          <option value="u">Underline</option>
          <option value="hl">Highlight</option>
          <option value="tc">Text Color</option>
          <option value="i">Italicize</option>
          <option value="ff">Font</option>
          <option value="fs">Font Size</option>
          <option value="fw">Font Weight</option>
          <option value="hd">Heading</option>
          <option value="al">Align</option>
          <option value="in">Indent</option>
          <option value="er">Emoji Reaction</option>
          <option value="cl">Unstyle</option>
          <option value="ub">Unbold</option>
          <option value="uu">Un-underline</option>
          <option value="ui">Unitalicize</option>
          <option value="qu">Quote</option>
          <option value="ex">Execute Add-on</option>
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
        type === 'er' ||
        type === 'ex') && (
        <Input size="sm" ml="3px" value={config} onChange={onConfigChange} />
      )}
      {(type === 'fs' || type === 'in' || type === 'qu') && (
        <Input
          size="sm"
          ml="3px"
          type="number"
          value={config}
          onChange={onConfigChange}
        />
      )}
      {(type === 'b' ||
        type === 'u' ||
        type === 'i' ||
        type === 'hl' ||
        type === 'ht' ||
        type === 'tc' ||
        type === 'tt') && (
        <Tooltip label="Toggle" shouldWrapChildren>
          <Checkbox
            size="md"
            ml="8px"
            isChecked={config === 'toggle' || type === 'ht' || type === 'tt'}
            onChange={onToggleChange}
          />
        </Tooltip>
      )}
      <IconButton
        bg="transparent"
        size="sm"
        ml="3px"
        aria-label="Delete action"
        icon={<CloseIcon fontSize="12px" color="red.400" />}
        onClick={onDelete}
      />
    </Flex>
  )
}

export default ActionDisplay
