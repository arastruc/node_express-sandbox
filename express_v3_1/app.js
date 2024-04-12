const path = require("path");
const express = require("express");
const errorController = require("./controllers/error");
const liquibase = require("./config/liquibase-config");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const sequelize = require("./config/postgre-config");
const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

//bodyParser (xml, json mais pas les files)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//use to serve static files (css, js, img) - static middleware
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  return User.findOne({ where: { name: "User" } }).then((user) => {
    req.user = user;
    next();
  });
});

app.use("/admin", adminRoutes.routes);
app.use(shopRoutes);

app.use(errorController.get404);

User.belongsToMany(Product, { through: "User_Product" });
Product.belongsToMany(User, { through: "User_Product" });
User.hasOne(Cart);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

sequelize
  .sync()
  .then(() => {
    liquibase.instance.update();
  })
  .then(() => app.listen(3000));
