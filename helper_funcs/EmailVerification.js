const ValidateEmail = (email) => {
    const emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegExp.test(email);
};

export default ValidateEmail;