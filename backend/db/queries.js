const { PrismaClient } = require("../generated/prisma");

const prisma = new PrismaClient();

async function main() {
  // mock user
  const userData = {
    email: "brandon.parkerson.dev@gmail.com",
    password: "123",
    name: "Brandon Parkerson",
    writer: true,
  };
  // db queries
  const users = await prisma.user.findMany();
  if (users.length === 0) {
    const user = await prisma.user.create({
      data: {
        email: "brandon.parkerson.dev@gmail.com",
        password: "123",
        name: "Brandon Parkerson",
        writer: true,
      },
    });
    console.log("added user");
  } else {
    console.log(users);
  }
}

async function allUsers() {
  console.log("get all users called");
  const users = await prisma.user.findMany();
  console.log(users);
}

async function createUser(name, email, password) {
  const user = await prisma.user.create({
    data: {
      email,
      password,
      name,
    },
  });
  console.log("user created");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

module.exports = { main, allUsers, createUser };
