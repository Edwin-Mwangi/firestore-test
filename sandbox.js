//the 1st doc whe re git has been used deliberately to store several version of the file

const list = document.querySelector('ul');
const form = document.querySelector('form');
// const button = document.querySelector('button');

//add recipe func
const addRecipe = (recipe,id) => {
    let time = recipe.created_at.toDate(); //the timestamp is given a varName
    // console.log(recipe.created_at.toDate()); 
    let html =
    `
    <li data-id='${id}'>
    <div>${recipe.title}</div>
    <div>${time}</div>
    <button class="btn btn-danger btn-sm my-2">delete</button>
    </li>

    `;
    list.innerHTML += html; 

} 

//deleteRecipe func
const deleteRecipe = (id) =>{
    const recipes = document.querySelectorAll('li');
    recipes.forEach(recipe =>{
        if(recipe.getAttribute('data-id') === id){
            recipe.remove();
        }
    }) 
}

//getting data
db.collection('recipes').onSnapshot(snapshot =>{
    // console.log(snapshot.docChanges()); //snapshot has several methods we can use 
    snapshot.docChanges().forEach(change =>{
        const doc = change.doc;
        if(change.type === "added"){
            addRecipe(doc.data(),doc.id);
        }else if(change.type === "removed"){
            deleteRecipe(doc.id)
        }
    })
}); 

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

//del button
list.addEventListener('click', e => {
    if(e.target.tagName === 'BUTTON'){
        const id = e.target.parentElement.getAttribute('data-id');

        db.collection('recipes').doc(id).delete().then(()=>{
            console.log("recipe deleted");
        });
    }
});



/* button.setEventListener('click', () =>{
    unsub()
})
 */