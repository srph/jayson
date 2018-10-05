import * as React from 'react'
import styled from 'styled-components'
import s from './styles'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/monokai.css'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/htmlmixed/htmlmixed'
import { Controlled as CodeMirror } from 'react-codemirror2'
import * as pretty from 'pretty'

interface UiJsonEditorProps {
  value: string
  language: 'javascript' | 'html'
  autoFocus?: boolean
  onAutoFormat?: (value: string) => void
  onChange?: (value: string) => void
}

const ui = {}
ui.Wrapper = styled.div`
  font-family: ${s['font-family-monospace']};
`

export default class UiJsonEditor extends React.Component<UiJsonEditorProps, void> {
  pasted: boolean = false

  getLanguage() {
    switch (this.props.language) {
      case 'html':
        return 'htmlmixed'
      default:
        return this.props.language
    }
  }

  render() {
    return (
      <ui.Wrapper>
        <CodeMirror
          value={this.props.value}
          onBeforeChange={this.handleBeforeChange}
          onPaste={this.handlePaste}
          options={{
            mode: this.getLanguage(),
            theme: 'monokai',
            lineNumbers: true
          }}
          className="ui-json-editor"
        />
      </ui.Wrapper>
    )
  }

  handleBeforeChange = (editor, data, value: string) => {
    this.props.onChange && this.props.onChange(value)
  }

  handlePaste = (editor, evt) => {
    setTimeout(() => {
      let formatted

      try {
        switch (this.props.language) {
          case 'javascript':
            formatted = JSON.stringify(JSON.parse(this.props.value), null, 2)
            break
          case 'html':
            formatted = pretty(this.props.value)
            break
          default:
            formatted = this.props.value
        }
      } catch (e) {
        return
      }

      this.props.onChange && this.props.onChange(formatted)
    }, 500)
  }
}
