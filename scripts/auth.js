//get data




//listen for auth status

auth.onAuthStateChanged(user =>{
    if(user){
        db.collection('guides').onSnapshot(snapshot => {
            setupGuides(snapshot.docs);
            setupUI(user);
        });
    } else{
        setupGuides([]);
        setupUI();
    }
})








//sign up

const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit',(e)=>{
    e.preventDefault();

    //get user info
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;

    auth.createUserWithEmailAndPassword(email,password).then(cred => {
        return db.collection('users').doc(cred.user.uid).set({
            bio: signupForm['signup-bio'].value
        }).then(()=>{
        const modal = document.querySelector('#modal-signup');
        M.Modal.getInstance(modal).close();
        signupForm.reset();

         } );
});


//logout
const logout = document.querySelector('#logout');
logout.addEventListener('click',(e)=>{
    e.preventDefault();
    auth.signOut();
})







//login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit',(e)=>{
    e.preventDefault();

    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    auth.signInWithEmailAndPassword(email,password).then(cred =>{
        const modal = document.querySelector('#modal-login');
        M.Modal.getInstance(modal).close();
        loginForm.reset();
    })
})