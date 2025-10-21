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
  console.log(users);
  const posts = await prisma.post.findMany();
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
  }
  if (posts.length === 0) {
    const user = await prisma.user.findUnique({
      where: {
        email: "brandon.parkerson.dev@gmail.com",
      },
    });
    const post = await prisma.post.create({
      data: {
        title: "Example Title",
        content: "Example content for the post",
        author: {
          connect: { id: user.id },
        },
      },
    });
    console.log("created example post");
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

async function findUser(email) {
  console.log("find user db called");
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  console.log(user);
  return user;
}

async function getAllPosts() {
  const posts = await prisma.post.findMany();
  console.log(posts);
  return posts;
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

module.exports = { main, allUsers, createUser, findUser, getAllPosts };
