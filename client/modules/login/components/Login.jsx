import React from 'react';
import { Card, CardTitle, Grid, Cell, Textfield, Button} from 'react-mdl';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        username:'',
        password:''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleChange(e) {
      this.setState({[e.target.name]:e.target.value});
  }

  handleSubmit() {
      const { login } = this.props;
      const { username, password } = this.state;
      login(username, password);
  }

  handleKeyDown(e) {
      if(e.key === 'Enter') {
          this.handleSubmit();
      }
  }
  render() {
      return (
          <div style={{marginTop:'30px', marginLeft:'auto', marginRight:'auto', width:'80%'}}>
            <Grid>
                <Cell col={6} offset={3}>
                    <Card shadow={1} style={{width:'100%'}} >
                        <div style={{color:'#fff', height:'100px', justifyContent:'flex-start', alignItems:'center'}} className="indigo">
                            <h3 style={{textAlign:'center'}}>Project D</h3>
                        </div>
                           
                        <Grid noSpacing={true}>
                            <Cell col={9} offset={2} style={{marginTop:'20px',marginBottom:'0px'}} >
                                <h6 style={{fontWeight:'bold', marginBottom:'10px'}}>Please Login</h6>
                            </Cell>
                            <Cell col={9} offset={2}>
                                <Textfield
                                    onChange={this.handleChange.bind(this)}
                                    onKeyDown={this.handleKeyDown.bind(this)}
                                    label="Username"
                                    name="username"
                                    floatingLabel
                                    style={{width:'100%'}}
                                />
                            </Cell>
                            <Cell col={9} offset={2} style={{marginBottom:'20px'}} >
                                <Textfield
                                    onChange={this.handleChange.bind(this)}
                                    onKeyDown={this.handleKeyDown.bind(this)}
                                    label="Password"
                                    name="password"
                                    type="password"
                                    floatingLabel
                                    style={{width:'100%'}}
                                />
                            </Cell>
                            <Cell col={9} offset={2} style={{marginBottom:'50px'}} >
                                <Button className="indigo" style={{width:'100%', height:'50px'}} ripple raised colored onClick={this.handleSubmit.bind(this)}>
                                    Login
                                </Button>
                            </Cell>
                            
                            
                        </Grid>
                    </Card>
                </Cell>
            </Grid>
          </div>
      );
   
  }

}
