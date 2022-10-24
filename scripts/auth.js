//list to auth state change 
auth.onAuthStateChanged(user => {
    
    if(user){
        //db
        db.collection('profile').onSnapshot(snapshot => {
            console.log(snapshot.docs);
            setupUi(user);
            setupGuides(snapshot.docs);
            
        });
    }else{
        setupUi();
        setupGuides([]);
    }
});

//create profile
const createForm = document.querySelector('#create-form');
createForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const imageFile = createForm['image'].files[0];
    const imageNameConst = new Date() + '-' + imageFile.name

    const imageMetadata = {
        contentType:imageFile.type
    }

    const imageUploadTask = st.child(imageNameConst).put(imageFile, imageMetadata)
    
   // var imageDownloadUrl;
    imageUploadTask
        .then((snapshot => snapshot.ref.getDownloadURL()))
        .then(url => {
            console.log('url---> ', url);
            //alert("image uploaded");
            //const indexImage = document.querySelector("#photo");
            //indexImage.src = url;
            //imageDownloadUrl = url;

            db.collection('profile').add({
                bio: createForm['title'].value,
                imageUrl: url,
                imageName: imageNameConst
            }).then(() => {
                // close 
                const createModal = document.querySelector('#modal-create');
                M.Modal.getInstance(createModal).close();
                createForm.reset();
            });
            
        });
    
});

//signup page
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;

    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        const sModal = document.querySelector('#modal-signup');
        M.Modal.getInstance(sModal).close();
        signupForm.reset();
    });

});

//logouts
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut();
});

// logins 
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    auth.signInWithEmailAndPassword(email, password).then( cred => {

        const loginModal = document.querySelector('#modal-login');
        M.Modal.getInstance(loginModal).close();
        loginForm.reset(); 
    });
});