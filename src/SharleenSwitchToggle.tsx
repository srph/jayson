import * as React from 'react'
import styled, { css } from 'styled-components'
import s from './styles'

const ui = {} as any
ui.Wrapper = styled.button`
  position: relative;
  display: flex;
  background: ${s['color-blue']};
  height: 48px;
  padding-left: 4px;
  padding-right: 4px;
  border: 0;
  border-radius: 24px;
  cursor: pointer;
  outline: 0;
  margin: 0 auto;
  margin-bottom: 32px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  transition: 300ms all ease;

  &:hover, &:focus {
    box-shadow: 0 6px 8px rgba(0,0,0,0.3);
  }

  ${(props: any) => props.value && css`
    background: ${s['color-dark-silver']};
  `}
`
ui.Option = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 96px;
  height: 36x;
  padding-left: 8px;
  padding-right: 8px;
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
  color: ${s['color-white']};
  font-family: ${s['font-family-heading']};
`
ui.Haptic = styled.div`
  position: absolute;
  top: 6px;
  left: 6px;
  height: 36px;
  width: 96px;
  background: ${s['color-sky-blue']};
  border-radius: 18px;
  transform: ${(props: any) => `translateX(${props.translateX}px)`};
  transition: 400ms all cubic-bezier(0, 0, 0, 1);

  ${(props: any) => props.value && css`
    background: ${s['color-silver']};
  `}
`

interface SharleenSwitchToggleProps {
  value: boolean
  onChange: (value: boolean) => void
}

class SharleenSwitchToggle extends React.Component<SharleenSwitchToggleProps, {}> {
  render() {
    return (
      <ui.Wrapper value={this.props.value} onClick={this.handleClick}>
        <ui.Option>Escape</ui.Option>
        <ui.Option>Unescape</ui.Option>
        <ui.Haptic value={this.props.value} translateX={this.props.value ? 0 : 90} />
      </ui.Wrapper>
    )
  }

  handleClick = () => {
    this.props.onChange(!this.props.value)
  }
}

export default SharleenSwitchToggle