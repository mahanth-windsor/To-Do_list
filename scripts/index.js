
const guideList = document.querySelector('.guides');

const loggedOutElements = document.querySelectorAll('.logged-out');
const loggedInElements = document.querySelectorAll('.logged-in');

const setupUi = (user) => {
  if(user){
    loggedInElements.forEach(ele => ele.style.display = 'block');
    loggedOutElements.forEach(ele => ele.style.display = 'none');
  }else{
    loggedInElements.forEach(ele => ele.style.display = 'none');
    loggedOutElements.forEach(ele => ele.style.display = 'block');
  }
}

const setupGuides = (data) => {

  // let html = '';

  let items = [];

  if(data.length){

    data.forEach(doc => {

      items.push({
        id: doc.id, 
        ...doc.data()
      })

      // const profile = doc.data();
      // console.log(profile);
      // const li = `
      //   <li>
      //     <div class="collapsible-header grey lighten-4">${profile.bio}</div>
      //     <div class="collapsible-body white"><span>${profile.imageUrl}</span></div>
      //     <div class="collapsible-body white"><span>${doc.id}</span></div>
      //     <div class="collapsible-body white"><span>${profile.imageName}</span></div>
      //     <img class="collapsible-body white" id="photo" src="${profile.imageUrl}" style="width: 100%"/>
      //     <button id="deleteRecord" class="collapsible-body btn green darken-2 z-depth-0" style="line-height: 0px;">Done</button>
      //   </li>
      // `;
  
      // html += li;
    });
    
    generateItems(items);

    // guideList.innerHTML = html; 


  }else{
    guideList.innerHTML = `<h5 class="center-align">Login to view data</h5>`; 
  }
  
}

function generateItems(items){
  let html = '';

  items.forEach((item) => {

    
 
    // console.log(item);
    recordId = item.id;
    const li = `
      <li>
        <div class="collapsible-header grey lighten-4">${item.bio}</div>
        <img class="collapsible-body white" id="photo" src="${item.imageUrl}" style="width: 100%"/>
        <button onClick="deleteRecord('${String(item.id)}');" id="recDelete" data-id="${item.id}" class="collapsible-body btn green darken-2 z-depth-0" style="line-height: 0px;">Done</button>
      </li>
    `;

    html += li;

  });

  guideList.innerHTML = html; 

}

function deleteRecord(id){
  db.collection("profile").doc(id).delete();


  // item.get().then(function(doc) {
  //     if (doc.exists) {
  //         if(true){
  //             item.update({
  //                 status: "completed"
  //             })
  //         } else {
  //             item.update({
  //                 status: "active"
  //             })
  //         }
  //     }
  // })
}

// doc.data().status == "active"
// setup materialize components
document.addEventListener('DOMContentLoaded', function() {

    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);
  
    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);
  
  });
