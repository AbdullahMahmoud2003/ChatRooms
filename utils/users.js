const users = [];

//join user to chat
function userJoin(id,username,room){
    const user = {id, username, room};

    users.push(user);
    return user;
}

//get current user
function getCurrentUser(id) {
    return users.find(user => user.id === id);
}

//user leaves room
function eliminateUser(id) {
    const user = users.find(user => user.id === id);
    users.splice(id, 1);
    return user;
}

module.exports = {
    userJoin,
    getCurrentUser,
    eliminateUser
}