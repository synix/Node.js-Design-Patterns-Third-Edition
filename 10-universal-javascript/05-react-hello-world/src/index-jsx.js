import React from 'react'
import ReactDOM from 'react-dom'

/* eslint no-unused-vars: "off" */
class Hello extends React.Component {
  render () {
    return <h1>Hello {this.props.name || 'World'}</h1>
  }
}

ReactDOM.render(
  <Hello name="React😂"/>,
  document.getElementsByTagName('body')[0]
)
