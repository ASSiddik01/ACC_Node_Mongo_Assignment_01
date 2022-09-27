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
