import bcrypt from "bcryptjs";
const users = [
  {
    name: "john",
    email: "jjohn@a.in",
    password: bcrypt.hashSync("john", 10),
    isAdmin: true,
  },
  {
    name: "johny",
    email: "jjohny@a.in",
    password: bcrypt.hashSync("john", 10),
    isAdmin: false,
  },
  {
    name: "johniu",
    email: "jjohnui@a.in",
    password: bcrypt.hashSync("john", 10),
    isAdmin: false,
  },
  {
    name: "johnii",
    email: "jjohnii@a.in",
    password: bcrypt.hashSync("john", 10),
    isAdmin: false,
  },
];

export default users;
