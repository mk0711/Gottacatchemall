import React from 'react'

class Form extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      inputValue: ''
    }
  }

    render = () => {
      return (
        <div className="input_form">
          <form

            onSubmit={(e) => {
              e.preventDefault()

              this.props.onSubmit(this.state.inputValue)
            }}
          >

            <input
              className="input_text"
              type="text"
              placeholder={this.props.placeholderText}
              onChange={(e) => {
                var value = e.target.value

                this.setState({
                  inputValue: value
                })
              }}
            />
            <button id="form_button" type="submit"><i className="fa fa-search fa-lg" /></button>
          </form>
          <div id="message">
            <p>Search for a pokemon </p>
          </div>
        </div>

      )
    }
}

export default Form
