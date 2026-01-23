/**
 * Mock data and endpoints for users and resources.
 */


const users = [
  {
    id: 1,
    username: "johndoe",
    password: "password1",
    email: "johndoe@example.com"
  },
  {
    id: 2,
    username: "janedoe",
    password: "password2",
    email: "janedoe@example.com"
  },
  {
    id: 3,
    username: "bobsmith",
    password: "password3",
    email: "bobsmith@example.com"
  }
];

//TODO add users endpoints

const getUsers = (request, response) => {
  // ÄLÄ ikinä lähetä salasanoja HTTP vastauksessa!
  for (let i=0; i<users.length; i++) {
    delete users[i].password;
  }
  response.json(users);
};

// TODO getUserById
const getUserById = (req, res) => {
  console.log('getting user id:', req.params.id);
  const userFound = users.find((user) => user.id == req.params.id);
  if (userFound) {
    const userToReturn = {...userFound};
    delete userToReturn.password;
    res.json(userToReturn);
  } else {
    res.status(404).json({message: 'user not found'});
  }
};

// TODO putUserById
const putUserById = (req, res) => {
  console.log('Update user id:', req.params.id);
  const userIndex = users.findIndex((user) => user.id == req.params.id);
  if (userIndex !== -1) {
    // ÄLÄ salli salasanan päivitystä tällä metodilla
    const updatedUser = {...req.body};
    delete updatedUser.password;
    users[userIndex] = {id: users[userIndex].id, ...updatedUser};
    res.json({message: 'User updated'});
  } else {
    res.status(404).json({message: 'User not found'});
  }
};

// TODO deleteUserById
const deleteUserById = (req, res) => {
  console.log('Delete user id:', req.params.id);
  const userIndex = users.findIndex((user) => user.id == req.params.id);
  if (userIndex !== -1) {
    users.splice(userIndex, 1);
    res.json({message: 'User deleted'});
  } else {
    res.status(404).json({message: 'User not found'});
  }
};

// Käyttäjän lisäys, (rekisteröinti)
const postUser = (req, res) => {
  const newUser = req.body;
  // uusilla käyttäjillä pitää olla kaikki vaaditut ominaisuudet
  if ( !(newUser.username && newUser.password && newUser.email)) {
    return res.status(400).json({error: 'missing user data'});
  }
  // HUOM: älä ikinä loggaa käyttäjätietoja pakollisten testien jälkeen
  // console.log('registering new user', newUser);
  const newId = users[users.length-1].id + 1;
  // luodaan uusi objekti joka sisältää id:n
  // ja kaikki newuser ominaisuudet
  users.push({id: newId, ...newUser});
  delete newUser.password;
  console.log('users', users);
  res.status(201).json({message: 'new user added', user_id: newUser});
};

const postLogin = (req, res) => {
  const {username, password} = req.body;
  // Haetaan käyttäjä objekti nimeen perusteella
  const userFound = users.find(user => username === user.username);
  if (userFound) {
    if(userFound.password === password) {
      delete userFound.password;
      return res.json({message: 'login ok', user: userFound});
    }
    return res.status(403).json({error: 'invalid password'});
  }
  res.status(404).json({error: 'user not found'});
};

export {getUsers, postUser, postLogin, getUserById, putUserById, deleteUserById };
