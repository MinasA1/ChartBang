import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Switch, Route, withRouter} from 'react-router-dom';
import * as actions from '../actions';
import AuthForm from '../components/AuthForm';
import Homepage from '../components/Homepage';
import Dashboard from '../components/Dashboard';
import {Container} from 'semantic-ui-react';


class Main extends Component {
  constructor(props) {
    super(props);
    this.handleNewChart = this.handleNewChart.bind(this);
  }

  componentDidMount() {
    //this.props.loadCharts();
  }

  handleNewChart(text) {
    const {newMessage, history} = this.props;
    newMessage(text).then(() => {
      history.push('/');
    });
  }

  render() {
    const {
      user,
      authErrorMessage,
      handleSignIn,
      handleSignUp,
      handledbSubmit,
      history,
      wizard
    } = this.props;
    return (
        <Switch>
          <Route exact path='/signin' render={(props) => (
            <AuthForm
              signIn={true}
              buttonText={"Log in"}
              onAuth={(authInfo) => handleSignIn(authInfo).then(() => history.push('/Dashboard')) }
              errorMessage={authErrorMessage}
              {...props}
            />
          )} />
          <Route exact path='/signup' render={(props) => (
            <AuthForm
              signIn={false}
              buttonText={"Sign me up!"}
              onAuth={(authInfo) => handleSignUp(authInfo).then(() => history.push('/'))}
              errorMessage={authErrorMessage}
              {...props}
            />
          )} />
          />
          <Route
            exact path='/Dashboard'
            render={(props) => (
              <Dashboard
                wizard={wizard}
                user={user}
                onCredentials={(dbOptions) => handledbSubmit(dbOptions).then(() => console.log('SubmitedCred'))}
                {...props}
                />
            )}
          />
          <Route exact path='/' component={Homepage} />
        </Switch>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  authErrorMessage: state.errorMessage,
  wizard: state.form.wizard

});

const mapDispatchToProps = (dispatch, ownProps) => ({
  handleSignIn(authData) { return dispatch(actions.signIn(authData)); },
  handleSignUp(authData) { return dispatch(actions.signUp(authData)); },
  handledbSubmit(dbOptions) {return dispatch(actions.submitDb(dbOptions));}
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
