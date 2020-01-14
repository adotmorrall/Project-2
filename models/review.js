module.exports = function(sequelize, DataTypes) {
  var Review = sequelize.define(
    "Review",
    {
      title: DataTypes.STRING,
      titleDescription: DataTypes.TEXT,
      userID: DataTypes.STRING,
      ID: DataTypes.INTEGER
    },
    {
      timestamps: false
    }
  );
  return Review;
};
