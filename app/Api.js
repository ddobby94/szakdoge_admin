// a library to wrap and simplify api calls
import apisauce from 'apisauce'

// https://us-central1-my-trips-1f14a.cloudfunctions.net/addExtraTokens

const create = (baseURL = 'https://my-trips-1f14a.firebaseio.com') => {

  const api = apisauce.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
    },
    timeout: 30000,
  })

  const cloudFunctions = apisauce.create({
    baseURL: 'https://us-central1-my-trips-1f14a.cloudfunctions.net',
    // baseURL: 'http://localhost:5000/my-trips-1f14a/us-central1/',
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
    },
    timeout: 30000,
  })

  api.addRequestTransform((request) => {
  })

  const addNewCar = (id, data) =>
    api.put(
        '/cars/' + id + '.json',
        data,
    )

  const addNewWorker = (id, data) =>
    api.put(
        '/workers/' + id + '.json',
        data,
    )
    
  const loadSelectedWorker = (id) =>
    api.get(
      '/workers/' + id + '.json'
    )

  const loadSelectedCar = (id) =>
    api.get(
      '/cars/' + id + '.json'
    )

  const loadRoutesById = (id) =>
    api.get(
      '/routes/' + id + '.json'
    )

  const postShit = (comp, data) =>
    api.put(
      comp + '.json',
      data,
  )


  const addSuperAdmin = (company, data) =>
    api.put(
      company + '/superAdmin.json',
      data,
  )

  const setUserData = (data) =>
    cloudFunctions.post(
      '/setUserData',
      data,
    )


  const getUserData = (uid) =>
    cloudFunctions.post(
      '/getSignedInUserData',
      { uid },
    ) 

  const getCompanyData = (uid) =>
    cloudFunctions.post(
      '/getCompanyData',
      { uid },
    ) 

  /*
getCompanyData
  const getUser = (authData, username) =>
    api.get(
      '/api/users/show/' + username,
      {},
      {
        headers: {
          'Authorization': 'Bearer ' + authData.token,
          'Authorization-idt': 'Bearer_idt ' + authData.idt,
          'Authorization-rft': 'Bearer_rft ' + authData.rft,
          'Authorization-uname': 'Bearer_uname ' + authData.uname
        }
      }
    )
*/
  
  return {
    addNewCar,
    addNewWorker,
    loadSelectedWorker,
    loadSelectedCar,
    loadRoutesById,
    postShit,
    addSuperAdmin,
    setUserData,
    getUserData,
    getCompanyData,
  }
}

export default {
  create
}
