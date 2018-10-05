import * as React from 'react'
import styled, { css } from 'styled-components'
import s from './styles'

interface UiFieldProps {
  label: string
  children: JSX.Element
  disabled?: boolean
  error?: string
  tooltip?: string
  action?: JSX.Element
}

const ui = {}
ui.Field = styled.div`
  margin-bottom: 48px;
  transition: 250ms all ease;

  ${props =>
    props.disabled &&
    css`
    opacity: 0.5;
  `}
`
ui.Label = styled.label`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  font-weight: bold;
  font-family: ${s['font-family-heading']};
  font-size: 12px;
  margin-bottom: 8px;
  text-transform: uppercase;
`
ui.LabelError = styled.div`
  font-size: 10px;
  background: red;
  padding: 4px;
  color: ${s['color-white']};
`
ui.Tooltip = styled.div`
  margin-top: 12px;
  font-size: 10px;
  font-style: italic;
`

export default function Input(props: UiFieldProps) {
  return (
    <ui.Field disabled={props.disabled}>
      <ui.Label>
        <span>{props.label}</span>
        {props.error && Boolean(props.error.length) && <ui.LabelError>Invalid JSON!</ui.LabelError>}
        {props.action &&
          React.cloneElement(props.action, {
            disabled: props.disabled
          })}
      </ui.Label>
      {React.cloneElement(props.children, {
        disabled: props.disabled
      })}
      {props.tooltip && props.tooltip.length && <ui.Tooltip dangerouslySetInnerHTML={{ __html: props.tooltip }} />}
    </ui.Field>
  )
}
