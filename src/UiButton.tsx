import * as React from 'react'
import styled, { css } from 'styled-components'
import s from './styles'

const ui = {}
ui.Button = styled.button`
  display: inline-block;
  height: 26px;
  line-height: 25px;
  padding: 0 12px;
  font-weight: 600;
  font-family: ${s['font-family-heading']};
  font-size: 10px;
  text-transform: uppercase;
  color: ${s['color-lavender']};
  background: ${s['color-white']};
  border: 1px solid ${s['color-silver']};
  border-radius: ${s['border-radius']}px;
  box-shadow: ${s['drop-shadow']};
  cursor: pointer;
  transform: translateY(0);
  transition: 200ms cubic-bezier(.06,.67,.37,.99) all;
  outline: 0;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  ${props =>
    props.preset !== 'clear' &&
    css`
    &:not(:disabled):hover,
    :focus {
      transform: translateY(-2px);
      box-shadow: ${s['drop-shadow-lower']};
    }
  `}

  ${props =>
    props.preset === 'clear' &&
    css`
    border: 0;
    box-shadow: initial;
  `}

  ${props =>
    props.preset === 'primary' &&
    css`
    color: ${s['color-white']};
    background: ${s['color-lavender']};
  `}
`

interface UiButtonProps {
  preset: 'clear' | 'primary' | ''
}

export default function UiButton(props: any) {
  return <ui.Button {...props} />
}
