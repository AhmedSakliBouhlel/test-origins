const jwt = require('jsonwebtoken');
const { jwtPrivateKey, env } = require('../../config/vars');
const db = require('../../config/db');

const TOKEN_EXPIRATION = {
  ACCESS: 60 * 30,
  REFRESH: 60 * 60 * 24 * 30,
  MAIL: 60 * 10,
  API: 60 * 60 * 24,
};

class User {
  constructor({
    id, firstName, lastName, email, password, createdAt, updatedAt,
  }) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.name = `${firstName} ${lastName}`;
    this.email = email;
    this.password = password;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static async find(query) {
    let users = await db.table('user')
      .select()
      .where(query);
    users = users.map((user) => new User(user));
    return users;
  }

  async insert() {
    this.createdAt = new Date();
    this.updatedAt = null;
    const toInsert = { ...this };
    delete toInsert.name;
    await db('user').insert(toInsert);
    const [{ id }] = await db('user').select('id').where({ email: toInsert.email });
    this.id = id;
    return this;
  }

  generateAccessToken() {
    const {
      id, firstName, lastName, email,
    } = this;
    const token = jwt.sign({
      id, firstName, lastName, email,
    }, jwtPrivateKey, { expiresIn: TOKEN_EXPIRATION.ACCESS });
    return token;
  }

  generateApiToken() {
    const {
      id, firstName, lastName, email,
    } = this;
    const token = jwt.sign({
      id, firstName, lastName, email,
    }, jwtPrivateKey, { expiresIn: TOKEN_EXPIRATION.API });
    return token;
  }

  generateRefreshToken() {
    const token = jwt.sign({ id: this.id }, jwtPrivateKey, {
      expiresIn: TOKEN_EXPIRATION.REFRESH,
    });
    return token;
  }

  generateRefreshCookie() {
    return [
      'refreshToken',
      this.generateRefreshToken(),
      {
        httpOnly: true,
        secure: env === 'production',
        maxAge: TOKEN_EXPIRATION.REFRESH * 1000,
        path: '/api/auth/refresh',
        // sameSite: 'None',
      },
    ];
  }

  generateAccessCookie() {
    return [
      'accessToken',
      this.generateAccessToken(),
      {
        httpOnly: false,
        secure: env === 'production',
        maxAge: TOKEN_EXPIRATION.ACCESS * 1000,
        // sameSite: 'None',
      },
    ];
  }
}

module.exports = User;
