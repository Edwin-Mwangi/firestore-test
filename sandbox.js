const list = document.querySelector('ul');
const form = document.querySelector('form');

//add recipe func
const addRecipe = (recipe) => {
    let time = recipe.created_at.toDate(); //the timestamp is given a varName
    // console.log(recipe.created_at.toDate()); 
    let html =
    `
    <li>
    <div>${recipe.title}</div>
    <div>${time}</div>
    </li>
    `;
    list.innerHTML += html; 

} 
//getting data
db.collection('recipes').get()
.then(snapshot => {
    snapshot.docs.forEach(doc =>{
        // console.log(doc.data())
        addRecipe(doc.data());
    })
})
.catch(err => console.log(err));  

//saving data in firebase
form.addEventListener('submit', e =>{
    e.preventDefault();
    const now = new Date();//to get time when data is keyed in

    const recipe = {
        title: form.recipe.value,
        created_at: firebase.firestore.Timestamp.fromDate(now) //converts now into readable db date
    };
    db.collection('recipes').add(recipe)
    .then(()=>{
        console.log('recipe added')
    })
    .catch(err =>{
        console.log(err);
    })
});