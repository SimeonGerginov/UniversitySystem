module.exports = {
    USERNAME_MATCH_PATTERN: /^[a-zA-Z0-9 ]{3,30}$/g,
    FIRSTNAME_MATCH_PATTERN: /^[a-zA-Z0-9 ]{3,18}$/g,
    LASTNAME_MATCH_PATTERN: /^[a-zA-Z0-9 ]{3,18}$/g,
    PASSWORD_MATCH_PATTERN: /^[a-zA-Z0-9 ]{8,30}$/g,
    EMAIL_MATCH_PATTERN: /^[a-z0-9]+[_a-z0-9\.-]*[a-z0-9]+@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/g
};
