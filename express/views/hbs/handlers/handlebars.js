module.exports = {
  css: function () {
    return '<link rel="stylesheet" href="/css/forms.css"/><link rel="stylesheet" href="/css/product.css" />';
  },
  active: function (expectedPath, realPath) {
    return expectedPath === realPath && "active";
  },
};
