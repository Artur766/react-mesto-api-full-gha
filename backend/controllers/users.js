const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;

const BadRequestError = require('../errors/bad-request-err');
const NotFoundError = require('../errors/not-found-err');
const ConflictError = require('../errors/conflict-err');

module.exports.getUsers = (req, res, next) => {
  // найти вообще всех
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

module.exports.getUserId = (req, res, next) => {
  // ищет запись по идентификатору
  User.findById(req.params.userId)
    .orFail(() => new NotFoundError('Пользователь с указанным id не существует'))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') return next(new BadRequestError('Переданы некорректные данные с некорректным id.'));
      return next(err);
    });
};

module.exports.createUser = (req, res, next) => {
  // ищет запись по идентификатору
  const {
    name,
    about,
    avatar,
    email,
  } = req.body;

  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
      about,
      avatar,
    })
      .then((user) => res.status(201).send({
        email: user.email,
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        _id: user._id,
      }))
      .catch((err) => {
        if (err.code === 11000) return next(new ConflictError('Пользователь с данным email уже существует'));
        if (err.name === 'ValidationError') return next(new BadRequestError('Переданы некорректные данные при создании пользователя.'));
        return next(err);
      }));
};

module.exports.updateUserInfo = (req, res, next) => {
  const userId = req.user._id;
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    userId,
    { name, about },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
    },
  )
    .then((user) => {
      if (!user) throw new NotFoundError('Пользователь с указанным id не найден.');
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') return next(new BadRequestError('Переданы некорректные данные с некорректным id.'));
      if (err.name === 'ValidationError') return next(new BadRequestError('Переданы некорректные данные при обновлении профиля.'));
      return next(err);
    });
};

module.exports.updateUserAvatar = (req, res, next) => {
  const userId = req.user._id;
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    userId,
    { avatar },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
    },
  )
    .then((user) => {
      if (!user) throw new NotFoundError('Пользователь с указанным id не найден.');
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') return next(new BadRequestError('Переданы некорректные данные с некорректным id.'));
      if (err.name === 'ValidationError') return next(new BadRequestError('Переданы некорректные данные при обновлении аватара.'));
      return next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      return res.send({ token });
    })
    .catch(next);
};

module.exports.getCurrentUser = (req, res, next) => {
  const { _id } = req.user;
  User.findById(_id)
    .orFail(() => new NotFoundError('Пользователь с указанным id не существует'))
    .then((user) => {
      if (!user) return next(new NotFoundError('Пользователь не найден.'));
      return res.send(user);
    })
    .catch(next);
};
