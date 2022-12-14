export type User = {
  email: string;
  password: string;
  token: string;
};

const users: User[] = [
  {
    email: "random@rosmdc.com",
    password: "password",
    token: "",
  },
  {
    email: "raso@gmail.com",
    password: "password",
    token: "",
  },
];

const findUser = async (email: string, password: string) => {
  const user = users.find(
    (user) => user.email === email && user.password === password
  );
  if (user) {
    return user;
  }
  throw new Error("User not found");
};

export default findUser;
