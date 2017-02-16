import React from 'react';
import UserList from '../containers/userList';
import {Grid, Cell, Textfield} from 'react-mdl';


export default class Users extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { users } = this.props;

    return (
        <div style={{width: '70%', margin: 'auto'}}>
            <Grid>
                <Cell col={12}>
                    <h3 style={{marginBottom:'0px'}}>Users</h3>
                </Cell>

                <Cell col={12}>
                    <Textfield
                        label="Search"
                        name="Search"
                        type="text"
                        floatingLabel
                        style={{width:'100%'}}
                    />
                    <UserList users={users} />
                </Cell>
            </Grid>
            
        </div>
    );
  }
}


