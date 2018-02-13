import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const getAuthenticatedUser = (user) => {
    if(!user){
        return Promise.reject("Unauthorized");
    }
    return Promise.resolve(user);
}

export const resolvers = {
    Query: {
        me: (root, args, {User,reqUser}) => {
            return getAuthenticatedUser(reqUser).then(loginUser => {
                return new Promise((resolve, reject) => {
                    User.findOne({username: loginUser.username}, (err, searchedUser) => {
                        return err ? reject(err) : resolve(searchedUser.username);
                    });
                });
            });
        }
    },
    Mutation: {
        login: (root, args, {SECRET, User}) => {
            return new Promise((resolve, reject) => {
                User.findOne({username: args.username}, (err, userObj) => {
                    if(err){
                        return reject("Error while fetching users");
                    }
                    if(userObj == null){
                        return reject("Unauthorized");
                    }
                    bcrypt.compare(args.password, userObj.password, (err, valid) => {
                        if(!valid){
                            return reject("Unauthorized");
                        }
                        resolve(jwt.sign({
                            id: userObj._id,
                            username: userObj.username
                        }, SECRET, {
                            expiresIn: '1d'
                        }));
                    });
                });
            });
        },
        signup: (root, newUser, {User}) => {
            return bcrypt.hash(newUser.password, 10).then(hash => {
                return new Promise((resolve, reject) => {
                    User.findOne({username: newUser.username}, (err, userObj) => {
                        if(userObj){
                            return reject("User is already exist");
                        }
                        newUser.password = hash;
                        new User(newUser).save(newUser, (err, userObj) => {
                            return err ? reject(err): resolve(userObj.username);
                        })
                    });
                });
            });
        }
    }
}