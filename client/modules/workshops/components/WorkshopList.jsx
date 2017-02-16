import React from 'react';
import {Grid, Cell, DataTable, TableHeader, Button, Textfield} from 'react-mdl';

import RequireAuth from '../../containers/RequireAuth';
import ManageWorkshop from '../containers/manageWorkshop';
const ManageWorkshopWithAuth = RequireAuth(ManageWorkshop);

const moment = require('moment');

export default class WorkshopList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        isManage:false,
        activeWorkshop:''
    }

    this.fetchWorkshops = this.fetchWorkshops.bind(this);
    this.handleManage = this.handleManage.bind(this);
    this.handleList = this.handleList.bind(this);
  }

  handleManage(workshop) {
      const { isManage } = this.state;
      if(isManage) {
          this.setState({isManage:false, activeWorkshop:''});
      } else {
          this.setState({isManage:true, activeWorkshop:workshop._id});
      }
  }

  handleList() {
      const { isManage, activeWorkshop } = this.state;
      if(isManage) {
          return <ManageWorkshopWithAuth workshopId={activeWorkshop} handleManage={this.handleManage} />;
      } else {
          const { workshops } = this.props;
          const workshopArray = this.fetchWorkshops(workshops);
          return (
              <Grid noSpacing>
                <Cell col={3} style={{display:'flex',  alignItems:'center'}}>
                    <Button raised colored ripple style={{margin:5}}>Add New</Button>
                </Cell>
                <Cell col={9}>
                    <Textfield
                        label="Search workshop..."
                        name="search"
                        type="text"
                        floatingLabel
                        style={{width:'100%'}}
                    />
                </Cell>
                <Cell col={12}>
                <DataTable
                    selectable
                    shadow={0}
                    rowKeyColumn="id"
                    rows= {workshopArray}
                    style={{width:'100%'}}
                >
                    <TableHeader name="title" >Title</TableHeader>
                    <TableHeader name="isActive" >Active</TableHeader>
                    <TableHeader name="isFeatured" >Featured</TableHeader>
                    <TableHeader name="isPicked" >Editor's Pick</TableHeader>
                    <TableHeader name="action" >Action</TableHeader>

                </DataTable>
                </Cell>
            </Grid>
          );
      }

  }

  fetchWorkshops(workshops) {
      let workshopArray= [];
      workshops.map((workshop) => {
          workshopArray.push({
              id:workshop._id,
              title: <span style={{fontWeight:'bold'}}>{workshop.title}</span>,
              isActive: (workshop.isActive) ? 'Yes' : 'No',
              isPicked: (workshop.isPicked) ? 'Yes' : 'No',
              isFeatured: (workshop.isFeatured) ? 'Yes' : 'No',
              action: <Button raised colored ripple onClick={this.handleManage.bind(this, workshop)} >Manage</Button>
          });
      });

      return workshopArray;
  }

  render() {
    const content = this.handleList();
    return (
        <div>
            {content}
        </div>
    );
  }
}


