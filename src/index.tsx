import * as React from 'react'
import { render } from 'react-dom'
import 'sanitize.css'
import UiContainer from './UiContainer'
import UiHeader from './UiHeader'
import UiField from './UiField'
import UiCodeEditor from './UiCodeEditor'
import UiTransitionFadeIn from './UiTransitionFadeIn'
import CopyButton from './CopyButton'
import UiButton from './UiButton'
import Tip from './Tip'
import Footer from './Footer'
import SharleenSwitchToggle from './SharleenSwitchToggle'
import UiTooltip from './UiTooltip'

interface AppState {
  mode: string
  input: string
  output: string
}

enum Mode {
  Escape = 'escape',
  Unescape = 'unescape'
}

class App extends React.Component<{}, AppState> {
  state: AppState = {
    mode: Mode.Escape,
    input: '',
    output: ''
  }

  outputField?: JSX.Element

  render() {
    return (
      <UiContainer>
        <UiHeader>Jayson</UiHeader>

        <SharleenSwitchToggle value={this.state.mode !== Mode.Escape} onChange={this.handleModeChange} />

        {!this.state.output.length && (
          <UiTransitionFadeIn>
            <UiField
              label="Input"
              actions={
                <UiTooltip text="Please enter an input" disabled={Boolean(this.state.input.length)}>
                  <UiButton onClick={this.handleFormat} disabled={!this.state.input.length}>
                    {this.state.mode === Mode.Escape ? 'Escape' : 'Unescape'}
                  </UiButton>
                </UiTooltip>
              }>
              <UiCodeEditor
                value={this.state.input}
                onChange={this.handleInputChange}
                onPaste={this.handleInputPaste}
              />
            </UiField>
          </UiTransitionFadeIn>
        )}

        {Boolean(this.state.output.length) && (
          <UiTransitionFadeIn direction="up">
            <UiField
              label="Output"
              actions={[
                <UiButton preset="clear" onClick={this.handleReset}>
                  Reset
                </UiButton>,
                <CopyButton entity="Output" value={this.state.output}>
                  Copy
                </CopyButton>
              ]}
              wrapperRef={c => (this.outputField = c)}>
              <UiCodeEditor value={this.state.output} autodetectLanguage={false} />
            </UiField>
          </UiTransitionFadeIn>
        )}
        <Tip />
        <Footer />
      </UiContainer>
    )
  }

  handleReset = () => {
    this.setState({
      input: '',
      output: ''
    })
  }

  handleModeChange = (mode: boolean) => {
    this.setState({
      mode: mode ? Mode.Unescape : Mode.Escape,
      input: '',
      output: ''
    })
  }

  handleInputChange = (input: string) => {
    this.setState({
      input
    })
  }

  handleInputPaste = (input: string) => {
    this.setState({
      input,
      output: this.getFormat(input)
    })
  }

  handleFormat = () => {
    this.setState({
      output: this.getFormat(this.state.input)
    })
  }

  getFormat(input: string) {
    if (this.state.mode === Mode.Escape) {
      return JSON.stringify(input).replace(/(^\")|(\"$)/g, '')
    }

    try {
      return input.replace(/\\n|\\r/g, '').replace(/\\"/g, '"')
    } catch (e) {
      return input
    }
  }
}

render(<App />, document.getElementById('root'))
