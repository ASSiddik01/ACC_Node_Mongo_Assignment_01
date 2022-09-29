const fs = require("fs");
const url = require("url");
const allUsers = fs.readFileSync("user.json", "utf8");
let parsedUsers = JSON.parse(allUsers);

module.exports.getAllUsers = (req, res) => {
  res.status(200).json({
    success: true,
    message: "success",
    data: parsedUsers,
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
        data: randomUser,
      });
    }
  };
  randomNumber();
};

module.exports.saveUser = (req, res) => {
  let reqData = req.body[0];
  // Data Validation
  if (!reqData.id) {
    res.status(400).json({
      success: false,
      message: "Bad Request",
      data: "Id is required",
    });
  }
  if (!reqData.gender) {
    res.status(400).json({
      success: false,
      message: "Bad Request",
      data: "Gender is required",
    });
  }
  if (!reqData.name) {
    res.status(400).json({
      success: false,
      message: "Bad Request",
      data: "Name is required",
    });
  }
  if (!reqData.contact) {
    res.status(400).json({
      success: false,
      message: "Bad Request",
      data: "Contact is required",
    });
  }
  if (!reqData.address) {
    res.status(400).json({
      success: false,
      message: "Bad Request",
      data: "Address is required",
    });
  }
  if (!reqData.photoUrl) {
    res.status(400).json({
      success: false,
      message: "Bad Request",
      data: "Photo URL is required",
    });
  } else {
    let idArray = [];
    let newUser = [];
    for (const user of parsedUsers) {
      newUser.push(user);
      idArray.push(user.id);
    }
    const newid = idArray.pop() + 1;
    reqData.id = newid;
    newUser.push(reqData);
    const stringfiedUser = JSON.stringify(newUser);
    fs.writeFileSync("user.json", stringfiedUser);
    res.status(200).json({
      success: true,
      message: "success",
      data: "Data Added Successfully",
    });
  }
};

module.exports.updateUser = (req, res) => {
  const { id } = req.query;
  const findData = parsedUsers.find(
    (parsedUser) => parsedUser.id == Number(id)
  );
  const reqData = req.body[0];
  const updateData = { ...findData, ...reqData };
  const findDataIndex = parsedUsers.indexOf(findData);
  // validate the user id
  if (findDataIndex < 0) {
    res.status(404).json({
      success: false,
      message: "failed",
      data: `Id no ${id} is not found`,
    });
  } else {
    parsedUsers.splice(findDataIndex, 1, updateData);
    const stringfiedUser = JSON.stringify(parsedUsers);
    fs.writeFileSync("user.json", stringfiedUser);
    res.status(200).json({
      success: true,
      message: "success",
      data: `Id no ${id} is updated`,
    });
  }
};

module.exports.bulkUpdate = (req, res) => {
  const reqData = req.body;
  for (const singleData of reqData) {
    const userIndex = parsedUsers?.findIndex(
      (user) => user.id == singleData.id
    );
    const reqIndex = reqData?.findIndex((user) => user.id == singleData.id);
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
  const findData = parsedUsers.find(
    (parsedUser) => parsedUser.id == Number(id)
  );
  const findDataIndex = parsedUsers.indexOf(findData);

  // validate the user id
  if (findDataIndex < 0) {
    res.status(404).json({
      success: false,
      message: "failed",
      data: `Id no ${id} is not found`,
    });
  } else {
    parsedUsers = parsedUsers.filter(
      (parsedUser) => parsedUser.id !== Number(id)
    );
    const stringfiedUser = JSON.stringify(parsedUsers);
    fs.writeFileSync("user.json", stringfiedUser);
    res.status(200).json({
      success: true,
      message: "success",
      data: "User delete",
    });
  }
};
