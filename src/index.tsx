import * as React from 'react'
import { render } from 'react-dom'
import 'sanitize.css'
import UiContainer from './UiContainer'
import UiHeader from './UiHeader'
import UiField from './UiField'
import UiCodeEditor from './UiCodeEditor'
import CopyButton from './CopyButton'
import Tip from './Tip'
import Footer from './Footer'
import SharleenSwitchToggle from './SharleenSwitchToggle'

interface AppState {
  mode: boolean
  input: string
  output: string
}

enum Mode {
  Encode = false,
  Decode = true
}

class App extends React.Component<void, AppState> {
  state: AppState = {
    mode: Mode.Encode,
    input: '',
    output: ''
  }

  render() {
    return (
      <UiContainer>
        <UiHeader>Jayson Holmes</UiHeader>

        <SharleenSwitchToggle value={this.state.mode} onChange={this.handleModeChange} />

        <UiField label="Input">
          <UiCodeEditor value={this.state.input} onChange={this.handleInputChange} language="javascript" />
        </UiField>

        {Boolean(this.state.output.length) && (
          <UiField
            label="Output"
            action={
              <CopyButton text="Output" value={this.state.output}>
                Copy
              </CopyButton>
            }>
            <UiCodeEditor value={this.state.output} language="javascript" />
          </UiField>
        )}
        <Tip />
        <Footer />
      </UiContainer>
    )
  }

  handleModeChange = (mode: boolean) => {
    this.setState({
      mode,
      input: '',
      output: ''
    })
  }

  handleInputChange = (input: string) => {
    this.setState(
      {
        input
      },
      () => {
        clearTimeout(this.timeout)

        this.timeout = setTimeout(() => {
          let output = ''

          if (this.state.mode === Mode.Encode) {
            output = JSON.stringify(this.state.input).replace(/(^\")|(\"$)/g, '')
          } else {
            try {
              output = JSON.parse(`"${this.state.input}"`)
            } catch (e) {
              output = this.state.input
            }
          }

          this.setState({
            output
          })
        }, 500)
      }
    )
  }
}

render(<App />, document.getElementById('root'))
