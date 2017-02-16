export default {

    toggleSwitch({Meteor, LocalState}, workshopId, type, checked) {
        Meteor.call('workshops.toggle', workshopId, type, checked, (err) => {
            if(err) {
                console.log(err);
            }
        });
    },

    addSchedule({Meteor, LocalState}, data) {
        Meteor.call('schedules.add', data, (err) => {
            if(err) {
                console.log(err);
            }
        });
    }
    

}