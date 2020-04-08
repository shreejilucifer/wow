const validateLogin = (phone, password) => {
  if (!phone) return { status: false, message: 'Phone Number is Required' };
  if (!password) return { status: false, message: 'Password is Required' };
  return { status: true };
};

export const login = async (phone, password) => {
  const test = validateLogin(phone, password);

  if (!test.status) return test;

  await fetch('https://jsonplaceholder.typicode.com/todos');

  return { status: true, data: { phone, password } };
};
