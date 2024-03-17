const users = [];

//join user to chat
function userJoin(id, username, room){
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
    const user = users.findIndex(user => user.id === id);
    if(user != -1) {
        return users.splice(user, 1)[0];
    }
}

//get room users
function getAllUsers(room) {
    const roomUsers = [];
    for (var i = 0; i < users.length; i++)
    {
        if (users[i].room === room)
        {
            roomUsers.push(users[i]);
        }
    }
    return roomUsers
}

module.exports = {
    userJoin,
    getCurrentUser,
    eliminateUser,
    getAllUsers
}