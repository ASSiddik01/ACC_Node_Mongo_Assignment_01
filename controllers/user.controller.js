module.exports.getAllUsers = (req, res) => {
  res.status(200).json({
    success: true,
    message: "success",
    data: "All user found",
  });
};
