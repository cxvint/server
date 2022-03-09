const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const User = sequelize.define('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: 'USER' },
});

const Blog = sequelize.define('blog', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  author: { type: DataTypes.STRING, unique: true, allowNull: false },
  text: { type: DataTypes.STRING, unique: true, allowNull: false },
  rating: { type: DataTypes.INTEGER, defaultValue: 0 },
  img: { type: DataTypes.STRING, allowNull: false },
});

const Type = sequelize.define('type', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const Category = sequelize.define('category', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const Rating = sequelize.define('rating', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  rate: { type: DataTypes.INTEGER, allowNull: false },
});

const TypeCategory = sequelize.define('type_category', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

User.hasMany(Rating);
Rating.belongsTo(User);

Type.hasMany(Blog);
Blog.belongsTo(Type);

Category.hasMany(Blog);
Blog.belongsTo(Category);

Blog.hasMany(Rating);
Rating.belongsTo(Blog);

Type.belongsToMany(Category, { through: TypeCategory });
Category.belongsToMany(Type, { through: TypeCategory });

module.exports = { User, Blog, Type, Category, Rating, TypeCategory };
