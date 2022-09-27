const fs = require("fs");
const data = fs.readFileSync("user.json", "utf8");

module.exports.getAllUsers = (req, res) => {
  res.status(200).json({
    success: true,
    message: "success",
    data: JSON.parse(data),
  });
};

module.exports.getRandomUser = (req, res) => {
  const parsedData = JSON.parse(data);
  const length = parsedData.length - 1;
  const randomNumber = () => {
    const number = Math.round(Math.random() * 100);
    if (number > length) {
      randomNumber();
    } else {
      const randomId = number;
      let randomUser = [];
      const randomData = parsedData[randomId];
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
  const parsedData = JSON.parse(data);
  let idArray = [];
  let allUser = [];
  for (const user of parsedData) {
    allUser.push(user);
    idArray.push(user.id);
  }
  const newid = idArray.pop() + 1;
  userData.id = newid;
  allUser.push(userData);
  const stringfiedUser = JSON.stringify(allUser);
  console.log(stringfiedUser);
  fs.writeFileSync("user.json", stringfiedUser);
  res.status(200).json({
    success: true,
    message: "success",
  });
};
