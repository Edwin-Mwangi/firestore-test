db.collection('recipes').get()
.then(snapshot => console.log(snapshot))    //when we get the data
.catch(err => console.log(err));  