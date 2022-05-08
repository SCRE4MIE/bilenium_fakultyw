
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
}

export default requests;