
const requests = {
  registration: `user/register/`,
  login: `token/`,
  refresh: `token/refresh/`,
  logout: `user/logout/blacklist/`,
  userDetails: 'user/get-user-details/',
  editProfile: 'user/edit-user-profile/',
  trainerList: 'v1/trainers-list/',
  trainerDetails: 'v1/get-trainer/',
  ownerDogList: 'v1/users-dog-list/',
  addDog: 'v1/create-dog/',
  userDogList: 'v1/users-dog-list/',
  dogDetails: 'v1/get-update-del-dog/',
}

export default requests;