import React, {Component} from 'react';
import {Segment, Container, Input, Button, Form} from 'semantic-ui-react';
import './AuthForm.css'
class AuthForm extends Component {
  static defaultProps = { 
    onAuth() {},
    heading: "Welcome",
    buttonText: "Log in",
    signIn: true,
    errorMessage: undefined
  }

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      name: '',
      password: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state, ' from handleSubmit');
    this.props.onAuth(this.state);
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  render() {
    const {email, name, password} = this.state;
    const {signIn, heading, buttonText, errorMessage} = this.props;
    const style = {
      display: 'flex',
      allignItems: 'center'
    }
    if (signIn) {
      return (
        <Container style={{display: 'flex', justifyContent: 'center', textAlign: 'center'}}>
          <Form onSubmit={this.handleSubmit}>
            <h2>{heading}</h2>
            {errorMessage ?
               <div>{errorMessage}</div> :
               undefined}
            <Form.Input
              width={16}
              placeholder="E-mail"
              name="email"
              value={email}
              onChange={this.handleChange}/>

            <Form.Input
              width={16}
              placeholder="Password"
              type="password"
              name="password"
              value={password}
              onChange={this.handleChange}/>
            <Button type="submit">{buttonText}</Button>
          </Form>
        </Container>
      );
    } else {
      return (
      <Container style={{display: 'flex', justifyContent: 'center', textAlign: 'center'}}>
        <Form onSubmit={this.handleSubmit}>
          <h2>Join ChartBang</h2>
          <Form.Input
            style={{display: 'flex', justifyContent:'center'}}
            width={16}
            name="email"
            placeholder='E-mail'
            value={email}
            onChange={this.handleChange}/>
          <Form.Input
            width={16}
            name="name"
            placeholder='Full Name'
            value={name}
            onChange={this.handleChange}/>
          <Form.Input
            width={16}
            type="password"
            placeholder='Password'
            name="password"
            value={password}
            onChange={this.handleChange}/>
          <Form.Checkbox label='I agree to the Terms and Conditions'/>
          <Button type="submit">Sign me up!</Button>
        </Form>
      </Container>
      );
    }
  }
}

export default AuthForm;
