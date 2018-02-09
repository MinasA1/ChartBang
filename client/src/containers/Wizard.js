import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import * as actions from '../actions';
import WizardFirst from '../components/Wizard/WizardPageOne';
import WizardSecond from '../components/Wizard/WizardPageTwo';
import WizardThird from '../components/Wizard/WizardPageThree';


class Wizard extends Component {
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
    const {handledbSubmit, onSubmit, user, wizard} = this.props
    const {page} = this.state
      if (user.databases) {
       return ( <div>
        {page === 1 && 
          <WizardFirst 
            onSubmit={this.nextPage} 
            wizard={wizard}
            />}
        {page === 2 &&
          <WizardSecond
            previousPage={this.previousPage}
            onSubmit={handledbSubmit}
            nextPage={this.nextPage}
            wizard={wizard}
          />}
        {page === 3 &&
          <WizardThird
            previousPage={this.previousPage}
            nextPage={this.nextPage}
            onSubmit={onSubmit}
            wizard={wizard}
          />}
      </div>
       )} else {
       return (<div />)
       }
  }
}

const mapStateToProps = state => ({
  user: state.user,
  wizard: state.form.wizard

});

const mapDispatchToProps = (dispatch, ownProps) => ({
  handledbSubmit(dbOptions) {return dispatch(actions.submitDb(dbOptions));}
  //here goes onsumbit for page three of wizard
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Wizard));