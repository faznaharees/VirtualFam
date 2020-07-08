const guideList = document.querySelector('.guides');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');

const setupUI = (user) => {
    if(user){
        //account info
        db.collection('users').doc(user.uid).get().then(doc => {
            const html =    `
            <div>Logged in as ${user.email}</div>
            <div>${doc.data().bio}</div>`;
            accountDetails.innerHTML = html;
     
        });
        //toggle UI elements
               loggedInLinks.forEach(item =>  item.style.display='block');
        loggedOutLinks.forEach(item => item.style.display='none');
    }
    else{
        //hide account info
        accountDetails.innerHTML = '';
        loggedOutLinks.forEach(item => item.style.display='block');
        loggedInLinks.forEach(item => item.style.display='none');
 
    }
}

//setup guides
const setupGuides = (data) =>{
   if(data.length) {
    let html = '';
    data.forEach(doc => {
        const guide = doc.data();
        const li = `
        <li>
        <div class="collapsible-header grey lighten-4">${guide.title}</div>
        <div class="collapsible-body white"><span>${guide.content}</span></div>
        <img src=${guide.link} width=100%/>
        </li>`;
        html += li;
    }) ;
    guideList.innerHTML = html;
} else{
    guideList.innerHTML ='<h5 align=center>Login to view</h5>'
}
}


//
document.addEventListener('DOMContentLoaded',function() {
    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);

    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);
})


//form access
const form = document.querySelector('#create-form');


//adding form data to backend
form.addEventListener('submit' , (e)=> {
    e.preventDefault();
    db.collection('guides').add({
        title:form.title.value,
        content:form.content.value,
        link:form.link.value
    })
    form.title.value = '';
    form.content.value = '';
    form.link.value = '';
});

