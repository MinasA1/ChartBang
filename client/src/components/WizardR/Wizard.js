import React, {Component} from 'react';
import WizardFirst from './WizardPageOne';
import WizardSecond from './WizardPageTwo';
import WizardThird from './WizardPageThree';

class WizardForm extends Component {
  constructor(props) {
    super(props)
    this.nextPage = this.nextPage.bind(this)
    this.previousPage = this.previousPage.bind(this)
    this.state = {
      page: 1
    }
  }
  nextPage() {
    this.setState({page: this.state.page + 1})
  }

  previousPage() {
    this.setState({page: this.state.page - 1})
  }

  render() {
    const {onCredentials} = this.props
    const {onSubmit} = this.props
    const {page} = this.state
    return (
      <div>
        {page === 1 && <WizardFirst onSubmit={this.nextPage} />}
        {page === 2 &&
          <WizardSecond
            previousPage={this.previousPage}
            onSubmit={onCredentials}
            nextPage={this.nextPage}
          />}
        {page === 3 &&
          <WizardThird
            previousPage={this.previousPage}
            nextPage={this.nextPage}
            onSubmit={onSubmit}
          />}
      </div>
    )
  }
}


export default WizardForm