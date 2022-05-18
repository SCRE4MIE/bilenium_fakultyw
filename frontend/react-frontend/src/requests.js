
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
  trainerAvailible: 'v1/check_trainer_in_walks/',
  orderAWalk: 'v1/create-walk/',
  getWalks: 'v1/walks-list/',
  getTrainerWalks: 'v1/trainer-walks-list/',
  updateWalk: 'v1/update-walk/',
  getTrainerWorkDaysByUser: 'v1/get-trainer-work-days-by-user/',
  getDogById: 'v1/get-dog/',
}

export default requests;