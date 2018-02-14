import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import * as actions from '../actions';
import {formValueSelector} from 'redux-form'
import WizardFirst from '../components/Wizard/WizardPageOne';
import WizardSecond from '../components/Wizard/WizardPageTwo';
import WizardThird from '../components/Wizard/WizardPageThree';
import Steps from '../components/Wizard/Steps'
import data from '../reducers/data';

class Wizard extends Component {
  constructor(props) {
    super(props)
    }

  render() {
    const {handledbSubmit, onSubmit, nextPage, prevPage, readDB} = this.props
    const {page, user, values, checked, dbType, conn, schema} = this.props
      if (!user.databases.lenght) {
       return ( <div>
         <Steps page={page}/>
        {page === 1 && 
          <WizardFirst 
            onSubmit={nextPage} 
            checked={checked}
            dbs={user.databases}
            conn={conn}
            />}
        {page === 2 &&
          <WizardSecond
            prevPage={prevPage}
            onSubmit={handledbSubmit}
            dbType={dbType}
            nextPage={nextPage}
            readDB={readDB}
          />}
        {page === 3 &&
          <WizardThird
            schema={schema}
            prevPage={prevPage}
            nextPage={nextPage}
            onSubmit={onSubmit}
            />}
      </div>
       )} else {
       return (<div />)
       }
  }
}
const selector = formValueSelector('wizard')

const mapStateToProps = state => {
  const { checked, dbType, conn } = selector(state, 'checked', 'dbType')
  return ({
    schema: state.data,
    user: state.user,
    page: state.page,
    checked,
    dbType,
    conn
  })
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  handledbSubmit(dbOptions) {return dispatch(actions.submitDb(dbOptions));},
  nextPage() {return dispatch(actions.nextPage())},
  prevPage() {return dispatch(actions.prevPage())},
  readDB(name) {return dispatch(actions.readSchema(name))},
  setPage(page) {return dispatch(actions.setPage(page))}  
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Wizard));