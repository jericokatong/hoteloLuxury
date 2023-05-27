const getUser = async (req, res, next) => {
  res.render("index", { title: "Express" });
};

module.exports = { getUser };
