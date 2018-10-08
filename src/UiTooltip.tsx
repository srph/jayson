import * as React from 'react'
import styled from 'styled-components'
import s from './styles'
import Tether from 'react-tether'

const ui = {}
ui.Wrapper = styled.div`
  margin-right: 16px;
  padding: 8px;
  font-size: 10px;
  background: rgba(0,0,0,0.6);
  color: ${s['color-white']};
  border-radius: 4px;
  font-family: ${s['font-family']};
`
ui.Arrow = styled.div`
  position: absolute;
  top: 10px;
  right: 8px;
  height: 0;
  width: 0;
  border-width: 4px;
  border-color: transparent;
  border-style: solid;
  border-left-color: rgba(0,0,0,0.6);
`
ui.Trigger = styled.div`
  button {
    /* https://github.com/facebook/react/issues/4251#issuecomment-267004045 */
    pointer-events: none;
  }
`

interface UiTooltipProps {
  children: JSX.Element
  text: string
  attachment?: string
  disabled?: boolean
}

interface UiTooltipState {
  isActive: boolean
}

export default class UiTooltip extends React.Component<UiTooltipProps, UiTooltipState> {
  state: UiTooltipState = {
    isActive: false
  }

  wrapper: HTMLElement

  render() {
    return (
      <Tether
        attachment="middle left"
        constraints={[
          {
            to: 'scrollParent',
            attachment: 'together'
          }
        ]}>
        <ui.Trigger
          ref={c => (this.wrapper = c)}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}>
          {this.props.children}
        </ui.Trigger>
        {!this.props.disabled &&
          this.state.isActive && (
            <ui.Wrapper>
              {this.props.text} <ui.Arrow />
            </ui.Wrapper>
          )}
      </Tether>
    )
  }

  handleMouseEnter = (evt: MouseEvent) => {
    this.setState({
      isActive: true
    })
  }

  handleMouseLeave = (evt: MouseEvent) => {
    this.setState({
      isActive: false
    })
  }
}
