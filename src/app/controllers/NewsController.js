const NewController = {
  // [GET] / news
  index(req, res) {
    res.render("news");
  },

  // [GET] / news
  show(req, res) {
    res.render("show");
  },
};

export default NewController;
