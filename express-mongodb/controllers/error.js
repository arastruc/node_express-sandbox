exports.get404 = (_, res) => {
    res.status(404).render("not-found", { docTitle: "Not Found", path :"unknown" }); 
  }