const hesCode = (val) => /^[A-Za-z][0-9][A-Za-z][0-9]-[0-9][0-9][0-9][0-9]-[0-9][0-9]$/g.test(val);
const validPhone = (val) => /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/.test(val);

const validEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export { hesCode, validPhone, validEmail };