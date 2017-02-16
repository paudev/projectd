import React from 'react';
import {Grid, Cell, DataTable, TableHeader} from 'react-mdl';


export default class UserList extends React.Component {
  constructor(props) {
    super(props);

    this.fetchUsers = this.fetchUsers.bind(this);
  }

  fetchUsers(users) {
      let userArray = [];
      users.map((user) => {
          userArray.push({
              username:user.username,
              email:user.emails[0].address
          });
      });

      return userArray;
  }

  render() {
    const { users } = this.props;
    const userArray = this.fetchUsers(users);
    return (
        <DataTable
            selectable
            shadow={0}
            rowKeyColumn="id"
            rows= {userArray}
            style={{width:'100%'}}
        >
            <TableHeader name="username" >Username</TableHeader>
            <TableHeader name="email" >Email</TableHeader>

        </DataTable>

    );
  }
}


