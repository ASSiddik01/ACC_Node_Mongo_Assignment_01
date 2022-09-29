const fs = require("fs");
const url = require("url");
const allUsers = fs.readFileSync("user.json", "utf8");
let parsedUsers = JSON.parse(allUsers);

module.exports.getAllUsers = (req, res) => {
  res.status(200).json({
    success: true,
    message: "success",
    data: JSON.parse(allUsers),
  });
};

module.exports.getRandomUser = (req, res) => {
  const length = parsedUsers.length - 1;
  const randomNumber = () => {
    const number = Math.round(Math.random() * 100);
    if (number > length) {
      randomNumber();
    } else {
      const randomId = number;
      let randomUser = [];
      const randomData = parsedUsers[randomId];
      randomUser.push(randomData);
      res.status(200).json({
        success: true,
        message: "success",
        // data: JSON.parse(data),
        data: randomUser,
      });
    }
  };
  randomNumber();
};

module.exports.saveUser = (req, res) => {
  let userData = req.body[0];

  let idArray = [];
  let newUser = [];
  for (const user of parsedUsers) {
    newUser.push(user);
    idArray.push(user.id);
  }
  const newid = idArray.pop() + 1;
  userData.id = newid;
  newUser.push(userData);
  const stringfiedUser = JSON.stringify(newUser);
  console.log(stringfiedUser);
  fs.writeFileSync("user.json", stringfiedUser);
  res.status(200).json({
    success: true,
    message: "success",
  });
};

module.exports.updateUser = (req, res) => {
  const { id } = req.query;
  const findData = parsedUsers.find(
    (parsedUser) => parsedUser.id === Number(id)
  );

  const reqData = req.body[0];

  const updateData = { ...findData, ...reqData };
  const findDataIndex = parsedUsers.indexOf(findData);
  parsedUsers.splice(findDataIndex, 1, updateData);

  const stringfiedUser = JSON.stringify(parsedUsers);
  fs.writeFileSync("user.json", stringfiedUser);

  res.status(200).json({
    success: true,
    message: "success",
    data: `Id no ${id} is updated`,
  });
};

module.exports.bulkUpdate = (req, res) => {
  const reqData = req.body;
  for (const singleData of reqData) {
    const userIndex = parsedUsers.findIndex((user) => user.id == singleData.id);
    const reqIndex = reqData.findIndex((user) => user.id == singleData.id);
    if (userIndex > -1) {
      parsedUsers[userIndex] = {
        ...parsedUsers[userIndex],
        ...reqData[reqIndex],
      };
    }
    const stringfiedUser = JSON.stringify(parsedUsers);
    fs.writeFileSync("user.json", stringfiedUser);
  }

  res.status(200).json({
    success: true,
    message: "success",
    data: `Bulk updated`,
  });
};

module.exports.deleteUser = (req, res) => {
  const { id } = req.query;
  // console.log(Number(id));
  console.log(parsedUsers);
  parsedUsers = parsedUsers.filter(
    (parsedUser) => parsedUser.id !== Number(id)
  );
  console.log(parsedUsers);

  const stringfiedUser = JSON.stringify(parsedUsers);

  fs.writeFileSync("user.json", stringfiedUser);
  res.status(200).json({
    success: true,
    message: "success",
    data: "User delete",
  });
};
