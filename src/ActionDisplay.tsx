import React, { FC, ChangeEvent } from 'react'
import { Flex, IconButton, Input, Select } from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'

type ActionType = 'b' | 'u' | 'hl' | 'i' | 'ff' | 'fs' | 'hd' | 'cl' | 'al'
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
    } else if (type === 'ff') {
      newConfig = 'Arial'
    } else if (type === 'fs') {
      newConfig = '12'
    } else if (type === 'hd') {
      newConfig = 'Normal text'
    } else if (type === 'al') {
      newConfig = 'left'
    }
    onChange(type + (newConfig.length ? `#${newConfig}` : ''))
  }

  const onConfigChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value: val } = e.target
    onChange(type + (val.length ? `#${val}` : ''))
  }

  return (
    <Flex py='3px'>
      <Select size='sm' value={type} placeholder='Select action type' onChange={onTypeChange}>
        <option value='b'>Bold</option>
        <option value='u'>Underline</option>
        <option value='hl'>Highlight</option>
        <option value='i'>Italicize</option>
        <option value='ff'>Font</option>
        <option value='fs'>Font Size</option>
        <option value='hd'>Heading</option>
        <option value='al'>Align</option>
        <option value='cl'>Unstyle</option>
      </Select>
      {(type === 'ff' || type === 'hl' || type === 'hd' || type === 'al') && (
        <Input size='sm' ml='3px' value={config} onChange={onConfigChange} />
      )}
      {type === 'fs' && <Input size='sm' ml='3px' type='number' value={config} onChange={onConfigChange} />}
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
