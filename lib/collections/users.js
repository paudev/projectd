import { Class } from 'meteor/jagi:astronomy';

const User = Meteor.users;

const Password = Class.create({
  name: 'Password',
  fields: {
    bcrypt: {
        type: String,
        optional: false,
    }
  }
});

const LoginToken = Class.create({
  name: 'LoginToken',
  fields: {
    when: {
        type: Date,
        optional: false,
    },
    hashedToken: {
        type: String,
        optional: false,
    }   
  }
});

const LoginTokens = Class.create({
  name: 'LoginTokens',
  fields: {
    loginTokens: {
        type: [LoginToken],
        optional: false,
        default: function() {
        if (!this.loginTokens && (this.isInsert || this.isUpsert)) {
            return [];
        } else {
            return this.loginTokens;
        }
        }
    }
  }
});

const Service = Class.create({
  name:'Service',
  fields: {
    password: {
        type: Password,
        optional: true,
    },
    resume: {
        type: LoginTokens,
        optional: true,
    }
  }
});

const Email = Class.create({
  name: 'Email',
  fields: {
    address: {
        type: String,
        optional: false,
    },
    verified: {
        type: Boolean,
        optional: false,
    }
  }
});

const Profile = Class.create({
  name: 'Profile',
  fields: {
    name: {
        type: String,
        optional: true,
    },
    department: {
        type: String,
        optional: true,
    },
    authType: {
        type: String,
        optional: true,
    },
    localPhone: {
        type: String,
        optional: true,
    },
    birthDate: {
        type: Date,
        optional: true,
    },
    summary: {
        type: String,
        optional: true,
    },
    homeNumber: {
        type: String,
        optional: true,
    },
    mobileNumber: {
        type: String,
        optional: true,
    },
    personalEmail: {
        type: String,
        optional: true,
    },
    facebook: {
        type: String,
        optional: true,
    },
    twitter: {
        type: String,
        optional: true,
    },
    linkedIn: {
        type: String,
        optional: true,
    },
    skype: {
        type: String,
        optional: true,
    }
  }
});

const Users = Class.create({
  name: 'Users',
  collection:User,
  fields: {
    username: {
        type: String,
        optional: false
    },
    services: {
        type: Service,
        optional: false,
    },
    emails: {
        type: [Email],
        optional: false,
    },
    profile: {
        type: Profile,
        optional: false,
    },
    roles: {
        type: Object,
        optional: true,
    }
  }
});

export default Users;
