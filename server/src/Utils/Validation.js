function CheckField(field) {
    if(typeof field != 'undefined') {
        return true;
    }
    return false;
}

module.exports = CheckField;