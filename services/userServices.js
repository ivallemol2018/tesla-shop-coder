const { getAll, getByCriteria, create, getById, getByEmail, update } = require('../repositories/userRepository')
const NotFoundError = require('../exceptions/NotFoundError')

const getUsers = async () => {
  try {
    return await getAll();
  } catch (error) {
    throw error
  }
}

const getUserById = async id => {
  try {
    const user = await getById(id)

    return user
  } catch (error) {
    throw error
  }
}

const getUserByEmail = async email => {
  try {
    const user = await getByEmail(email)

    if (!user) {
      throw new NotFoundError('El usuario no existe ')
    }

    return user
  } catch (error) {
    throw error
  }
}

const getUserByCriteria = async criteria => {
  try {
    const user = await getByCriteria(criteria)

    if (!user) {
      throw new NotFoundError('El usuario no existe')
    }

    return user
  } catch (error) {
    throw error
  }
}

const createUser = async user => {
  try {
    const userFind = await getByEmail(user.email)

    if (userFind) {
      throw new NotFoundError('The user exists')
    }

    return await create(user)

  } catch (error) {
    throw error
  }
}

const updateUser = async product => {
  try {
    return await update(product)
  } catch (error) {
    throw error
  }
}

module.exports = {
  getUsers,
  getUserByCriteria,
  createUser,
  getUserById,
  getUserByEmail,
  updateUser
}