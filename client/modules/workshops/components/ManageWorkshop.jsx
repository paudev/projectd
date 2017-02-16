import React from 'react';
import {
    Grid, 
    Cell,
    DataTable, 
    TableHeader, 
    Button, 
    Textfield, 
    Tabs, 
    Tab, 
    Switch, 
    Card,
    CardActions,
    CardTitle,
    Badge,
    Dialog,
    DialogActions,
    DialogTitle,
    DialogContent,
    List,
    ListItem,
    ListItemContent,
    ListItemAction,
    Icon,
    FABButton,
    IconButton
} from 'react-mdl';

const moment = require('moment');
import '../libs/mdDateTimePicker.css';
import mdDateTimePicker from '../libs/mdDateTimePicker';

class Datepickers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        startDate:'',
    }
    this.startDate = this.props.scheduleDate;
    this.updateStart = this.updateStart.bind(this);

  }
  
  updateStart(value) {
    this.setState({
        startDate:value
    });
  }

  componentDidMount() {
        const updateStart = this.updateStart;
        const updateSchedule = this.props.updateSchedule;
        const startDate = this.startDate;

        const start = new mdDateTimePicker({
            type: 'date'
        });
        
        const startField = document.getElementById(this.startDate);
        start.trigger = startField;

        startField.addEventListener('click', function() {
            start.toggle();
        });
        
        startField.addEventListener('onOk', function(x) {
            updateStart(moment(start.time).format('MMM DD, YYYY').toString());
            updateSchedule(startDate, moment(start.time).toString());

        });
        
  }

  render() {
      return (
            <Textfield
                floatingLabel
                label="Schedule Date"
                id={this.startDate}
                style={{margin:10}}
                value={this.state.startDate}
            />
      );
  }

}


export default class ManageWorkshop extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        activeTab:0,
        activeContent:0,
        showAttendees:false,
        isEdit:false,
        isNew:false,
        dates:[],
        dateFields:[],
        dateFieldsIndex:0,
        
        //forms
        maxSlot:'',
        price:'',
        discountedPrice:''
    }

    this.handleContent = this.handleContent.bind(this);
    this.handleTab = this.handleTab.bind(this);
    this.tabContent = this.tabContent.bind(this);
    this.formContent = this.formContent.bind(this);
    this.showContent = this.showContent.bind(this);
    this.renderInformation = this.renderInformation.bind(this);
    this.renderSchedule = this.renderSchedule.bind(this);
    this.renderInstructor = this.renderInstructor.bind(this);
    this.handleShowAttendees = this.handleShowAttendees.bind(this);
    this.handleCloseAttendees = this.handleCloseAttendees.bind(this);
    this.showEdit = this.showEdit.bind(this);
    this.showNew = this.showNew.bind(this);
    this.hideEdit = this.hideEdit.bind(this);
    this.hideNew = this.hideNew.bind(this);
    this.handleSwitch = this.handleSwitch.bind(this);
    this.updateSchedule = this.updateSchedule.bind(this);
    this.generateDateId = this.generateDateId.bind(this);
    this.addScheduleField = this.addScheduleField.bind(this);
    this.addSchedule = this.addSchedule.bind(this);
    this.updateField = this.updateField.bind(this);
  }


  handleShowAttendees() {
    this.setState({
      showAttendees: true
    });
  }

  handleCloseAttendees() {
    this.setState({
      showAttendees: false
    });
  }

  showEdit() {
    this.setState({
      isEdit: true
    });
  }

  hideEdit() {
    this.setState({
        isEdit:false
    });
  }

  showNew() {
      this.setState({
          isNew:true
      })
  }

  hideNew() {
      this.setState({
          isNew:false
      })
  }

  handleContent(content) {
      this.setState({
          activeContent:content
      });
  }

  showContent() {
      const { activeContent } = this.state;
      switch(activeContent) {
          case 0:
            return this.tabContent(); break;
          case 1:
            return this.formContent(); break;
          default:
            return this.tabContent(); break;
      }
  }


  handleTab(workshop) {
      const { activeTab } = this.state;
      switch(activeTab) {
          case 0: // Information
            return this.renderInformation(workshop); break;
          case 1: // Schedule
            return this.renderSchedule(workshop); break;
          case 2: // Instructor
            return this.renderInstructor(workshop); break;
      }

  }

  handleSwitch(workshopId, type, e) {
      const { toggleSwitch } = this.props;
      toggleSwitch(workshopId, type, e.target.checked);
  }

  renderInformation(workshop) {
      return (
         <Grid style={{padding:10}}>
            <Cell col={8}>
                <div style={{border:'1px solid #E0E0E0', padding:20}}>
                <h5 style={{marginTop:0}}>Description</h5>
                {workshop.description}
                </div>
            </Cell>
            <Cell col={4}>
                <div style={{display:'flex', justifyContent:'space-around', flexDirection:'column', height:'150px', maxHeight:'300px', border:'1px solid #E0E0E0', padding:20}}>
                    <h5 style={{margin:0}}>Controls</h5>
                    <Switch onChange={this.handleSwitch.bind(this, workshop._id, 'isActive')} defaultChecked={workshop.isActive} >Active</Switch>
                    <Switch onChange={this.handleSwitch.bind(this, workshop._id, 'isFeatured')} defaultChecked={workshop.isFeatured}>Featured</Switch>
                    <Switch onChange={this.handleSwitch.bind(this, workshop._id, 'isPicked')} defaultChecked={workshop.isPicked}>Editor's Pick</Switch>
                </div>
            </Cell>
         </Grid>
      );
  }

  renderSchedule(workshop) {
      
      let schedules = (this.props.schedules.length !== 0)
      ? this.props.schedules.map((sched) => {
          return (
              <Cell shadow={0} col={12} style={{padding:10}} key={sched._id}>
                <Grid style={{minHeight:'150px'}}>
                    <Cell col={7} style={{display:'flex', justifyContent:'space-around', flexDirection:'column'}}>
                        <div style={{fontWeight:'bold', color:'#212121', fontSize:'16px', marginBottom:'5px', display:'flex', justifyContent:'space-between', flexDirection:'row'}}>
                            # of Dates: <span style={{fontWeight:'normal' ,color:'#212121', fontSize:'16px'}}>{sched.scheduleData.length}</span>
                        </div>
                        <div style={{fontWeight:'bold', color:'#212121', fontSize:'16px', marginBottom:'5px', display:'flex', justifyContent:'space-between', flexDirection:'row'}}>
                            Max Slot: <span style={{fontWeight:'normal' ,color:'#212121', fontSize:'16px'}}>{sched.maxSlot}</span>
                        </div>
                        <div style={{fontWeight:'bold', color:'#212121', fontSize:'16px', marginBottom:'5px', display:'flex', justifyContent:'space-between', flexDirection:'row'}}>
                            Regular Price: <span style={{fontWeight:'normal' ,color:'#212121', fontSize:'16px'}}>{(sched.regularPrice) ? `PHP ${sched.regularPrice}` : 'Free'}</span>
                        </div>
                        <div style={{fontWeight:'bold', color:'#212121', fontSize:'16px', marginBottom:'5px', display:'flex', justifyContent:'space-between', flexDirection:'row'}}>
                            Discounted Price: <span style={{fontWeight:'normal' ,color:'#212121', fontSize:'16px'}}>{(sched.discountedPrice) ? `PHP ${sched.discountedPrice}` : 'No Discount'}</span>
                        </div>
                        
                    </Cell>
                    <Cell col={5} style={{display:'flex', flexDirection:'column', justifyContent:'space-around'}}>
                        <Badge overlap text="4" onClick={this.handleShowAttendees} >
                            <Button raised ripple colored style={{overflow:'visible', margin:5}}>View Attendees</Button>
                        </Badge>
                        <Button className="red" raised ripple colored style={{overflow:'visible', margin:5}} onClick={this.showEdit.bind(this)}>Manage Schedule</Button>
                        <Button className="teal" raised ripple colored style={{overflow:'visible', margin:5}} >Add Coupoun</Button>
                        
                    </Cell>
                </Grid>
              </Cell>
          );
        })
      :  <Cell shadow={0} col={12} style={{padding:20}}>
            <h6 style={{marginBottom:'0px', marginTop:'0px', fontWeight:'400'}}>No Schedule Available</h6>
         </Cell>;

      return (
          <Grid style={{padding:10}}>
            <Cell col={12}>
                <h5 style={{marginBottom:'0px', marginTop:'0px'}}>Schedule</h5>
            </Cell>
            {schedules}
          </Grid>
      );
  }

  renderInstructor(workshop) {
      return (
          <Grid style={{padding:10}}>
            <Cell col={12}>
                <h5 style={{marginBottom:'0px', marginTop:'0px'}}>Instructor</h5>
            </Cell>
            <Cell col={4} shadow={0}>
                <Card shadow={0} className="img-responsive" style={{background: 'url(http://philnews.ph/wp-content/uploads/2014/08/Dimples-Romana.jpg) right top / cover', width:'100%'}}>
                    <CardTitle expand />
                    <CardActions style={{height: '52px', padding: '16px', background: 'rgba(0,0,0,0.2)'}}>
                        <span style={{color: '#fff', fontSize: '14px', fontWeight: '500'}}>
                            Dimples Romana
                        </span>
                    </CardActions>
                </Card>
            </Cell>
            <Cell col={4} shadow={0}>
                <Card shadow={0} className="img-responsive" style={{background: 'url(http://www.getmdl.io/assets/demos/image_card.jpg) right top / cover', width:'100%'}}>
                    <CardTitle expand />
                    <CardActions style={{height: '52px', padding: '16px', background: 'rgba(0,0,0,0.2)'}}>
                        <span style={{color: '#fff', fontSize: '14px', fontWeight: '500'}}>
                            Another Instructor
                        </span>
                    </CardActions>
                </Card>
            </Cell>
            <Cell col={4} shadow={0}>
                <Card shadow={0} className="img-responsive" style={{background: 'url(http://www.getmdl.io/assets/demos/image_card.jpg) right top / cover', width:'100%'}}>
                    <CardTitle expand />
                    <CardActions style={{height: '52px', padding: '16px', background: 'rgba(0,0,0,0.2)'}}>
                        <span style={{color: '#fff', fontSize: '14px', fontWeight: '500'}}>
                            Another Instructor
                        </span>
                    </CardActions>
                </Card>
            </Cell>
            <Cell col={4} shadow={0}>
                <Card shadow={0} className="img-responsive" style={{background: 'url(http://www.getmdl.io/assets/demos/image_card.jpg) right top / cover', width:'100%'}}>
                    <CardTitle expand />
                    <CardActions style={{height: '52px', padding: '16px', background: 'rgba(0,0,0,0.2)'}}>
                        <span style={{color: '#fff', fontSize: '14px', fontWeight: '500'}}>
                            Another Instructor
                        </span>
                    </CardActions>
                </Card>
            </Cell>
            <Cell col={4} shadow={0}>
                <Card shadow={0} className="img-responsive" style={{background: 'url(http://www.getmdl.io/assets/demos/image_card.jpg) right top / cover', width:'100%'}}>
                    <CardTitle expand />
                    <CardActions style={{height: '52px', padding: '16px', background: 'rgba(0,0,0,0.2)'}}>
                        <span style={{color: '#fff', fontSize: '14px', fontWeight: '500'}}>
                            Another Another Instructor
                        </span>
                    </CardActions>
                </Card>
            </Cell>
            <Cell col={4} shadow={0}>
                <Card shadow={0} className="img-responsive" style={{background: 'url(http://www.getmdl.io/assets/demos/image_card.jpg) right top / cover', width:'100%'}}>
                    <CardTitle expand />
                    <CardActions style={{height: '52px', padding: '16px', background: 'rgba(0,0,0,0.2)'}}>
                        <span style={{color: '#fff', fontSize: '14px', fontWeight: '500'}}>
                            Another Instructor
                        </span>
                    </CardActions>
                </Card>
            </Cell>
         </Grid>
      );
  }

  tabContent() {
      const { workshop } = this.props;
      const tabContent = this.handleTab(workshop);
      return (
        <Cell col={8} phone={12}tablet={12} shadow={0} style={{ margin:5}}>
            <div className="demo-tabs">
                <Tabs activeTab={this.state.activeTab} onChange={(tabId) => this.setState({ activeTab: tabId })} ripple>
                    <Tab>Information</Tab>
                    <Tab>Schedule</Tab>
                    <Tab>Instructor</Tab>
                </Tabs>
                {tabContent}
            </div>    
        </Cell>
      );
  }

  updateSchedule(prop, value) {
      this.setState({
         dates: this.state.dates.concat({[prop]:value})
      });
      console.log(this.state.dates);
  }

  generateDateId() {
      const id = 'scheduleDate-' + Math.random();
      return id;
  }

  deleteField(index) {
      console.log(index);
      const newState = [
          ...this.state.dateFields.slice(0, index),
          ...this.state.dateFields.slice(index+1)
      ];
      this.setState({dateFields: newState});
  }
  
  updateField(field, e) {
      this.setState({[field]:e.target.value});
  }

  formContent() {
      return (
        <Cell col={8} phone={12}tablet={12} shadow={0} style={{margin:5, padding:20}}>
            <Button raised ripple colored onClick={this.handleContent.bind(this,0)}>Go Back</Button>
            <h4>Add New Schedule</h4>
            <Textfield
                floatingLabel
                label="Price"
                ref="price"
                style={{margin:10}}
                value={undefined}
                onChange={this.updateField.bind(this, 'price')}
            />
             <Textfield
                floatingLabel
                label="Discounted Price"
                ref="discountedPrice"
                style={{margin:10}}
                value={undefined}
                onChange={this.updateField.bind(this, 'discountedPrice')}
            />
             <Textfield
                floatingLabel
                label="Max Slots"
                ref="maxSlot"
                style={{margin:10}}
                value={undefined}
                onChange={this.updateField.bind(this, 'maxSlot')}
            />
            <div>
                <h6 style={{padding:'0px', margin:0, display:'inline', marginRight:10}}>Schedule Data</h6>
                <FABButton className="indigo" colored mini ripple onClick={this.addScheduleField}>
                    <Icon name="add" />
                </FABButton>
            </div>
            <div id="datepickers-field">
               {this.state.dateFields}
             </div>

             <br/>
             <Button raised ripple colored onClick={this.addSchedule.bind(this)}>Add Schedule</Button>
        </Cell>
      );
  }

  addSchedule() {
      const { dates } = this.state;
      const { addSchedule } = this.props;

      const scheduleDate = dates.map((date) => {
          for(let key in date) {
              return {scheduleDate:date[key], timeline:{}};
          }
      });
      const {maxSlot, price, discountedPrice} = this.state
      const workshopId = this.props.workshop._id;
      let data = {
          maxSlot: maxSlot ? parseInt(maxSlot) : 0,
          price: price ? parseInt(price) : 0,
          discountedPrice: discountedPrice ? parseInt(discountedPrice) : 0,
          scheduleDate,
          workshopId
      }
      addSchedule(data);
  }

  addScheduleField() {
      const fields = this.state.dateFields.map((item, i) => {
        return (
            <div key={i}>
                <Datepickers scheduleDate={this.generateDateId()} updateSchedule={this.updateSchedule}/>
                <Button raised ripple colored style={{marginRight:10}}>Manage Timeline</Button>
                <Button raised ripple colored onClick={this.deleteField.bind(this, i)}>Delete</Button>
            </div>
        );
      });
      const fieldLength = fields.length;
      fields.push( <div key={fieldLength}>
                    <Datepickers scheduleDate={this.generateDateId()} updateSchedule={this.updateSchedule}/>
                    <Button raised ripple colored style={{marginRight:10}}>Manage Timeline</Button>
                    <Button raised ripple colored onClick={this.deleteField.bind(this, fieldLength)}>Delete</Button>
                </div>);
      console.log(fields);
      this.setState({dateFields:fields });
  }


  render() {
    const { workshop } = this.props;
    const content = this.showContent();
    
    return (
        <Grid style={{paddingLeft:0, paddingRight:0}}>
            <Cell col={12} style={{marginBottom:'20px'}}>
                <Button raised ripple colored onClick={this.props.handleManage}>Back To Active Workshops</Button>
            </Cell>
            <Cell col={12} style={{marginBottom:'20px'}}>
                <h5 style={{marginBottom:'0px', marginTop:'0px'}}>Manage Workshop</h5>
            </Cell>
            <Cell col={4} phone={12} tablet={12} shadow={0} style={{padding:20, margin:5}}>
                <h5 style={{marginTop:0}}>{workshop.title}</h5>
                <div style={{maxHeight:'500px', marginBottom:'20px'}}>
                    <img className="img-responsive" src="http://www.bittbox.com/wp-content/uploads/09-todo-task-manager-design-ui.jpg" />
                </div>
                <Button raised ripple colored style={{width:'100%', margin:5}}>Change Thumbnail</Button>
                <Button raised ripple colored style={{width:'100%', margin:5}} onClick={this.handleContent.bind(this, 1)}>Add Schedule</Button>
            </Cell>
            {content}

            <Dialog open={this.state.showAttendees} onCancel={this.handleCloseAttendees} style={{width:'70%'}}>
                <DialogTitle>Showing Attendees for {workshop.title}</DialogTitle>
                <DialogContent>
                    <Grid>
                        <Cell col={4} shadow={1} style={{padding:0}}>
                            <List style={{margin:0}}>
                                <ListItem threeLine>
                                    <ListItemContent 
                                        style={{whiteSpace: 'pre'}}
                                        avatar={<img src={"http://www.bittbox.com/wp-content/uploads/09-todo-task-manager-design-ui.jpg"}/>}
                                        subtitle={"pausuero29@gmail.com" + "\n" +"+639175533484"}
                                    >Paulo Suero</ListItemContent>
                                </ListItem>
                            </List>
                        </Cell>
                        <Cell col={4} shadow={1} style={{padding:0}}>
                            <List style={{margin:0}}>
                                <ListItem threeLine>
                                    <ListItemContent 
                                        style={{whiteSpace: 'pre'}}
                                        avatar={<img src={"http://www.bittbox.com/wp-content/uploads/09-todo-task-manager-design-ui.jpg"}/>}
                                        subtitle={"pausuero29@gmail.com" + "\n" +"+639175533484"}
                                    >Paulo Suero</ListItemContent>
                                </ListItem>
                            </List>
                        </Cell>
                        <Cell col={4} shadow={1} style={{padding:0}}>
                            <List style={{margin:0}}>
                                <ListItem threeLine>
                                    <ListItemContent 
                                        style={{whiteSpace: 'pre'}}
                                        avatar={<img src={"http://www.bittbox.com/wp-content/uploads/09-todo-task-manager-design-ui.jpg"}/>}
                                        subtitle={"pausuero29@gmail.com" + "\n" +"+639175533484"}
                                    >Paulo Suero</ListItemContent>
                                </ListItem>
                            </List>
                        </Cell>
                        <Cell col={4} shadow={1} style={{padding:0}}>
                            <List style={{margin:0}}>
                                <ListItem threeLine>
                                    <ListItemContent 
                                        style={{whiteSpace: 'pre'}}
                                        avatar={<img src={"http://www.bittbox.com/wp-content/uploads/09-todo-task-manager-design-ui.jpg"}/>}
                                        subtitle={"pausuero29@gmail.com" + "\n" +"+639175533484"}
                                    >Paulo Suero</ListItemContent>
                                </ListItem>
                            </List>
                        </Cell>
                        <Cell col={4} shadow={1} style={{padding:0}}>
                            <List style={{margin:0}}>
                                <ListItem threeLine>
                                    <ListItemContent 
                                        style={{whiteSpace: 'pre'}}
                                        avatar={<img src={"http://www.bittbox.com/wp-content/uploads/09-todo-task-manager-design-ui.jpg"}/>}
                                        subtitle={"pausuero29@gmail.com" + "\n" +"+639175533484"}
                                    >Paulo Suero</ListItemContent>
                                </ListItem>
                            </List>
                        </Cell>
                        <Cell col={4} shadow={1} style={{padding:0}}>
                            <List style={{margin:0}}>
                                <ListItem threeLine>
                                    <ListItemContent 
                                        style={{whiteSpace: 'pre'}}
                                        avatar={<img src={"http://www.bittbox.com/wp-content/uploads/09-todo-task-manager-design-ui.jpg"}/>}
                                        subtitle={"pausuero29@gmail.com" + "\n" +"+639175533484"}
                                    >Paulo Suero</ListItemContent>
                                </ListItem>
                            </List>
                        </Cell>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button type='button' onClick={this.handleCloseAttendees}>Close</Button>
                </DialogActions>
            </Dialog>
        </Grid>
    );
  }
}


