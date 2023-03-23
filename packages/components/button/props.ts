import { ReactNode } from 'react'
import {
  DisabledType,
  RoundType,
  SizeType,
  StatusType
} from '../../common'

export interface LButtonProps {
  type?: StatusType
  size?: SizeType
  round?: RoundType
  plain?: boolean
  disabled?: DisabledType
  children?: ReactNode
}
