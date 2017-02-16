import React from 'react';
import {Grid, Cell, Textfield, Tabs, Tab, Button} from 'react-mdl';
import WorkshopList from '../containers/workshopList';
import moment from 'moment';

export default class Workshops extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab:0,
      workshops:this.props.workshops
    };

    this.handleActiveContent = this.handleActiveContent.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      workshops:nextProps.workshops
    });
  }

  handleActiveContent(activeTab, workshops) {
    switch(activeTab) {
      case 0: // active
        return <WorkshopList workshops={workshops} />;
        break;
      case 1: // past
        return <div>Show past</div>;
        break;
      default:
        return <WorkshopList workshops={workshops} />;
        break;
    }
  }

  render() {
    const { workshops, activeTab } = this.state;
    const content = this.handleActiveContent(activeTab, workshops);

    return (
            <Grid style={{width: '70%', margin: 'auto'}}>
                <Cell col={12}>
                    <h3 style={{marginBottom:'0px'}}>Workshops</h3>
                </Cell>

                <Cell col={12}>
                  <div>
                    <Tabs activeTab={this.state.activeTab} onChange={(tabId) => this.setState({ activeTab: tabId })} ripple>
                        <Tab>Active</Tab>
                        <Tab>Past</Tab>
                    </Tabs>
                  </div>
                </Cell>
                <Cell col={12}>
                    <section>
                        {content}
                    </section>
                </Cell>
            </Grid>
    );
  }
}


