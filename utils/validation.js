/* eslint-disable no-useless-escape */
// eslint-disable-next-line import/prefer-default-export
export const validateEmail = (email) => {
    const regextSt =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regextSt.test(email);
};
