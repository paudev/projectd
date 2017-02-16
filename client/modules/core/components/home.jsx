import React from 'react';
import { Drawer, Layout, Header, Navigation, Content} from 'react-mdl';


const Home = () => (
<div>
    <Layout fixedHeader>
        <Header title={<span><strong>Project D</strong></span>}>
            <Navigation>
                <a href="">Link</a>
                <a href="">Link</a>
                <a href="">Link</a>
                <a href="">Link</a>
            </Navigation>
        </Header>
        <Drawer title="Project D">
            <Navigation>
                <a href="">Users</a>
                <a href={Meteor.absoluteUrl('workshops')}>Workshops</a>
                <a href="">Link</a>
                <a href="">Link</a>
            </Navigation>
        </Drawer>
        <Content />
    </Layout>
</div>
);

export default Home;
