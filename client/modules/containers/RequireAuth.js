import React, {Component} from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';

export default (Component) => {
  class RequireAuth extends Component {
    componentWillMount() {
      if(!Meteor.userId()) {
        FlowRouter.redirect('/login');
      }
    }

    render() {
      if(Meteor.userId())
        return <Component {...this.props} />;
      return null;
    }
  }

  return RequireAuth;
};