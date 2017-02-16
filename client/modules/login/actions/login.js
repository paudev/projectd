export default {

  login({Meteor, LocalState, FlowRouter, Accounts}, username, password) {
    if (!username || !password) {
      return LocalState.set('LOGIN_ERROR', 'Username and Password are required!');
    }

    LocalState.set('LOGIN_ERROR', null);

    const resultHandler = (err) => {
      if (err && err.reason) {
        return LocalState.set('LOGIN_ERROR', err.reason);
      }

      FlowRouter.go('/');
    };

      Meteor.loginWithPassword(username, password, resultHandler);
  },

};
