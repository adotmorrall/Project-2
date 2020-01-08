module.exports = function(sequelize, DataTypes) {
  var Review = sequelize.define("Review", {
    text: DataTypes.STRING,
    description: DataTypes.TEXT
  });
  return Review;
};
