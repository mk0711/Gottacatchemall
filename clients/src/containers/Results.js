import React from 'react'

class Results extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      information: []
    }

    this.displayIng = this.displayIng.bind(this)
  }

  displayIng (e) {
    e.preventDefault()
  }

  render = () => {
    return (
      <div className="row">
      </div>
    )
  }
}

export default Results
