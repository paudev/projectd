import React from 'react';
import { Drawer, Layout, Header, Navigation, Content} from 'react-mdl';


export default class MainLayout extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { content } = this.props;
    return (
        <div>
          <Layout fixedHeader>
              <Header title={<span><strong>Project D</strong></span>}>
                  <Navigation>
                      <a href="">Insert Links here ...</a>
                      <a href={Meteor.absoluteUrl('logout')} >Log-out</a>
                  </Navigation>
              </Header>
              <Drawer title="Project D">
                  <Navigation>
                      <a href={Meteor.absoluteUrl()}>Dashboard</a>
                      <a href={Meteor.absoluteUrl('users')}>Users</a>
                      <a href={Meteor.absoluteUrl('workshops')}>Workshops</a>
                      <a href="">Transactions</a>
                  </Navigation>
              </Drawer>
              <Content>
              {content()}
              </Content>
          </Layout>
      </div>
    );
  }
}


