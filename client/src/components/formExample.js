import React, { Component } from "react";
import {Segment, Button, Form} from 'semantic-ui-react';

class CheckoutFormPersonal extends Component {
    constructor() {
      super();    
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleSubmit(e) {
      e.preventDefault();
      this.props.onSubmit();
    }
    
    render() {
      const options = [
        { key: 'mysql', text: 'MySQL', value: 'mysql' },
        { key: 'postgres', text: 'PostgreSQL', value: 'postgres' }
      ];
      return (
        <Form onSubmit={this.handleSubmit}>
          <h3>Start a new Database Connection</h3>
          <Form.input
            width={8}
            name='name'
            placeholder="Connection name"
            value={this.props.name}
            onChange={this.props.onChangeName}
          />
          <Form.Dropdown
            width={8}
            placeholder=""
            options={options}
            defaultValue='mysql'
            onChange={this.props.onChangeType}
          />
          <Button type='submit'>Next</Button>
        </Form>
      );
    }
  }
  
  class CheckoutFormShipping extends Component {
    constructor() {
      super();
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleSubmit(evt) {
      evt.preventDefault();
      this.props.onSubmit();
    }
    
    render() {
      return (
        <form onSubmit={this.handleSubmit}>        
          <h3>Shipping</h3>
          <input
            type="text"
            placeholder="Address line"
            value={this.props.shippingLine}
            onChange={this.props.onChangeShippingLine}
          />
          <input
            type="text"
            placeholder="City"
            value={this.props.shippingCity}
            onChange={this.props.onChangeShippingCity}
          />
          <input
            type="text"
            placeholder="ZIP"
            value={this.props.shippingZip}
            onChange={this.props.onChangeShippingZip}
          />
          
          <button>Next</button>
        </form>
      );
    }
  }
  
  class CheckoutFormBilling extends Component {
    constructor() {
      super();
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleSubmit(evt) {
      evt.preventDefault();
      this.props.onSubmit();
    }
    
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <h3>Billing</h3>
          <input
            type="text"
            placeholder="Address line"
            value={this.props.billingLine}
            onChange={this.props.onChangeBillingLine}
          />
          <input
            type="text"
            placeholder="City"
            value={this.props.billingCity}
            onChange={this.props.onChangeBillingCity}
          />
          <input
            type="text"
            placeholder="ZIP"
            value={this.props.billingZip}
            onChange={this.props.onChangeBillingZip}
          />
          
          <button>Checkout</button>
        </form>
      );
    }
  }
  
  class CheckoutForm extends Component {
    constructor() {
      super();
      this.state = {
        step: 1,
        
        name: '',
        email: '',
        
        shipping_line: '',
        shipping_city: '',
        shipping_zip: '',
        
        billing_line: '',
        billing_city: '',
        billing_zip: '',
      };
      this.goToNext = this.goToNext.bind(this);
    }
    
    goToNext() {
      const { step } = this.state;
      if (step !== 3) {
        this.setState({ step: step + 1 });
      } else {
        alert('Submitting');
        
        const values = {
          name: this.state.name,
          email: this.state.email,
          shipping: {
            line: this.state.shipping_line,
            city: this.state.shipping_city,
            zip: this.state.shipping_zip,
          },
          billing: {
            line: this.state.billing_line,
            city: this.state.billing_city,
            zip: this.state.billing_zip,
          },
        };
        // submit `values` to the server here.
      }
    };
    
    handleChange(field) {
      return (evt) => this.setState({ [field]: evt.target.value });
    }
    
    render() {
      switch (this.state.step) {
        case 1:
          return <CheckoutFormPersonal
            key="personal"
            onSubmit={this.goToNext}
            name={this.state.name}
            email={this.state.email}
            onChangeName={this.handleChange('name')}
            onChangeEmail={this.handleChange('email')}
          />;
        case 2:
          return <CheckoutFormShipping
            key="shipping"
            onSubmit={this.goToNext}
            shippingLine={this.state.shipping_line}
            shippingCity={this.state.shipping_city}
            shippingZip={this.state.shipping_zip}
            onChangeShippingLine={this.handleChange('shipping_line')}
            onChangeShippingCity={this.handleChange('shipping_city')}
            onChangeShippingZip={this.handleChange('shipping_zip')}
          />;
        case 3:
          return <CheckoutFormBilling
            key="billing"
            onSubmit={this.goToNext}
            billingLine={this.state.billing_line}
            billingCity={this.state.billing_city}
            billingZip={this.state.billing_zip}
            onChangeBillingLine={this.handleChange('billing_line')}
            onChangeBillingCity={this.handleChange('billing_city')}
            onChangeBillingZip={this.handleChange('billing_zip')}
          />;
      }
    }
  }
  export default CheckoutForm;