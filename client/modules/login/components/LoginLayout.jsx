import React from 'react';


export default class Login extends React.Component {
  constructor(props) {
    super(props);
   
  }

  render() {
      const {content} = this.props;
      return (
          <div style={{flex:1 }}>
            <div>
                {content()}
            </div>
          </div>
      );
   
  }

}
