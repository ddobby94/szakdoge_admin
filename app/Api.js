// a library to wrap and simplify api calls
import apisauce from 'apisauce'

const create = (baseURL = 'https://my-trips-1f14a.firebaseio.com') => {

  const api = apisauce.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
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
  /*

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


 // const response = yield call(api.addPartnerContacts, authData, contacts, deletedContacts)
  const addPartnerContacts = (authData, contacts, deletedContacts = []) =>
    api.post(
      '/api/contacts/storecontacts',
      { all_contacts: [{ user_id: authData.uuid, deleted_contacts: deletedContacts, contacts: contacts }] },
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
  }
}

export default {
  create
}
