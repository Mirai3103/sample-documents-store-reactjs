import firebase, { db } from './config';

export const addDocument = (collection, document) => {
  const query = db.collection(collection);
  query
    .add({
      ...document,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(() => true)
    .catch((e) => {
      console.error('Error writing document: ', e);
      return false;
    });
};

export const queryDocument = async (user) => {
  const queryRef = await db.collection('users').where('uid', '==', user).get();
  if (queryRef.empty) {
    console.log('No matching documents.');
    return null;
  }

  return {
    docId: queryRef.docs[0].id,
    data: queryRef.docs[0].data()
  };
};
export const updateDocument = (docID, data) => {
  const query = db.collection('users').doc(docID);
  query
    .update({
      ...data
    })
    .then(() => true)
    .catch((e) => {
      console.error('Error updating document: ', e);
      return false;
    });
};
