const HiddenPassword = data => {
    return data.filter(function(user) {
        delete user.password;
        return user;
    });
}

module.exports = HiddenPassword;