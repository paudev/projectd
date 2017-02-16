import { Accounts } from 'meteor/accounts-base';
import { Workshops, Schedules } from '/lib/collections';
import moment from 'moment'; 


const ADMIN_USERNAME = 'admin';
const adminUser = Accounts.findUserByUsername(ADMIN_USERNAME);
if (typeof adminUser === 'undefined') {
  let username = ADMIN_USERNAME;
  let email = 'admin@cms.com';
  let password = 'password501';
  let name = ADMIN_USERNAME;
  let adminId = Accounts.createUser({username, email, password, profile: {name}});
  Roles.addUsersToRoles(adminId, "SUPER_ADMIN", Roles.GLOBAL_GROUP);

  console.log(` `);
  console.log(`***********************************************`);
  console.log(`* Admin Account has been created.`);
  console.log(`* Username: ${username}`);
  console.log(`* Password: ${password}`);
  console.log(`* Reminder: Please change the default password.`);
  console.log(`***********************************************`);
  console.log(` `);
}

if(!Workshops.findOne()) {
  const workshopId = Workshops.insert(
      {
        title:'Sample Workshop',
        description:`Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
        when an unknown printer took a galley of type and scrambled it to make a type specimen book.
        It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. 
        It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
        and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`
      }
    );
  const workshopId2 = Workshops.insert(
      {
        title:'A really really long title for a workshop',
        description:`Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
        when an unknown printer took a galley of type and scrambled it to make a type specimen book.
        It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. 
        It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
        and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`
      }
    );
  
  Schedules.insert({
    workshopId,
    maxSlot:50,
    scheduleData:[
      {
        scheduleDate: moment().toDate()
      }
    ]
  });

} 