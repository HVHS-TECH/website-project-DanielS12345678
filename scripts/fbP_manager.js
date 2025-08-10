/*********************************************/
// fbP_manager.js()
// processes reads, and writes 
// Has other fucntions like zoom 
/*********************************************/


var fbP_userDetails = {
  name: '',
  email: '',
  uid: '',
}


fbP_initialise();

function fbP_initialise() {
  console.log("fbP_initialise()");


  const firebaseConfig = {
    apiKey: "AIzaSyCUZqdFzg_DY6JWPObQKouN1I7T-7gkan0",
    authDomain: "webdevelopment-d-saunders-2025.firebaseapp.com",
    projectId: "webdevelopment-d-saunders-2025",
    storageBucket: "webdevelopment-d-saunders-2025.firebasestorage.app",
    messagingSenderId: "605859779405",
    appId: "1:605859779405:web:e5e051674477f0b1f01d04",
    measurementId: "G-XV95BR3MX7"
  };

  // Initialize Firebase
  //  const app = initializeApp(firebaseConfig);
  //  const analytics = getAnalytics(app);

  // Check if firebase already initialised
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    database = firebase.database();
  }

  // firebase ext:install firebase/firestore-send-email --project=webdevelopment-d-saunders-2025

}


/*********************************************/
// fbP_dropDownLinksDisplay()
// Called: When the user loads on any page
// Does: senors if the user has lcikced of the drop down link 
// Used on a touchscreen device 
// Calls: n/a
/*********************************************/
function fbP_dropDownLinksDisplay() {
  const CLICKAREA = document.getElementById('d_homeGridMain');
  const DROPDOWNLINKSDIV = document.getElementById('d_dropDownLinks');
  const VIEWLINK = document.getElementById('d_headerLink2');



  // Checks to see if the user has clicked off the drop down link
  CLICKAREA.addEventListener('touchstart', () => {

    DROPDOWNLINKSDIV.style.display = 'none';

  });
  // Checking if the user has clicked on the view link so drop down links appear 
  // used for when drop down links have already been hided 
  VIEWLINK.addEventListener('touchstart', () => {

    DROPDOWNLINKSDIV.style.display = 'block';

  });

}



/*********************************************/
// fbP_zoomOnPlant()
// Called: When the user loads on to a close view page
// Does: Controls the zoom on the swan plant Image 
// Calls: n/a
/*********************************************/
function fbP_zoomOnPlant() {

  const ZOOMIMAGE = document.getElementById('i_closeViewSwanPlant');

  var currentZoom = 1;
  const ZOOMSPEED = 0.3;


  /***** Image Zoom *****/
  // listening for the scroll wheel on the image 
  ZOOMIMAGE.addEventListener('wheel', (zoom) => {

    //     event.preventDefault();

    //  Determines what way is the user zooming 
    // -1 is out 
    // 1 is in 
    const DIRECTION = zoom.deltaY > 0 ? -1 : 1;

    // the current zoom 
    currentZoom += DIRECTION * ZOOMSPEED;

    if (currentZoom < 1) currentZoom = 1;
    if (currentZoom > 5) currentZoom = 5;

    // Apply the new zoom level

    ZOOMIMAGE.style.transform = `scale(${currentZoom})`;
  });
}

/**************************************************************/
// fb_login(_save, _procFunc)
// called when user hits enter on start screen (index html)
// Input: 
// _save is fbP_userDetails
// _procFunc is the function that processes the log in
// Return: n/a
/**************************************************************/
function fb_login(_save, _procFunc) {
  console.log('fb_login() START:');

  // hiding header and footer
document.getElementById("h_header").style.display = "none";
    document.getElementById("f_footer").style.display = "none";



  firebase.auth().onAuthStateChanged(newLogin);

  function newLogin(_user) {
    if (_user) {
      // user is signed in, so call function to process login data
      loginStatus = 'logged in';

      // console. log each prarmeter and fin the value
      _procFunc(loginStatus, _user, _save, null);
    } else {
      // user NOT logged in, so redirect to Google login
      loginStatus = 'logged out';
      console.log('fb_login(): status = ' + loginStatus);

      var provider = new firebase.auth.GoogleAuthProvider();
      // To force Google sign to ask which account to use:
      /*var provider = new firebase.auth.GoogleAuthProvider();
      provider.setCustomParameters({
         prompt: 'select_account'
      });
//error in code below

      firebase.auth().signInWithPopup(provider).then(function(result) {
            loginStatus = 'logged in via popup';
   */
      firebase.auth().signInWithPopup(provider).then(function (result) {
        loginStatus = 'logged in via popup';
        console.log("working");

        _procFunc(loginStatus, result.user, _save, null);
      })
        // Catch errors
        .catch(function (_error) {

          loginStatus = 'error';

          console.log(_error);
          _procFunc(loginStatus, null, _save, _error);
        });
    }
  }
}


/**************************************************************/
// fbP_procLogin( loginSatus, _user, _save)
// Called by fb_login()
// Processes the result of the log in
// Input:  
// loginStatus is the point where the program is in loging in
// _user is the user loging in
// _save is the data that is being saved  
// Return: console log the user details as a while and individually 
/**************************************************************/
//         _procFunc(loginStatus, _user, _save, _error);
function fbP_procLogin(loginStatus, _user, _save, _error) {
  console.log("fbP_procLogin(): Start");
  if (!_user) {
    // Error logging in
    console.error("fbP_procLogin(): error logging in");
    console.log(_user);
    var userInfo = result.user;
    var uid = _user.uid;
  } else {
    // No error logging in  
    var userInfo = _user;
    // putting log in data into _save
    _save.name = _user.displayName;
    _save.email = _user.email;
    _save.uid = _user.uid;
    console.table(fbP_userDetails);

    console.log("fbP_procLogin(): the users display name is " + _save.displayName);
    console.log("fbP_procLogin(): the users email is " + _save.email);
    console.log("fbP_procLogin(): the users uid is " + _save.uid);

    
    document.getElementById("d_checkingAcount").style.display = "none";

    document.getElementById("d_formElements").style.display = "block";
     document.getElementById("h_header").style.display = "block";
    document.getElementById("f_footer").style.display = "block";

    // putting values from account into form 
   document.getElementById('in_name').value = fbP_userDetails.name;
    document.getElementById('in_email').value = fbP_userDetails.email;
  }
}


function fbP_resetForm(){

    // clearing form values
   document.getElementById('in_name').value = '';
    document.getElementById('in_email').value = '';
 document.getElementById('in_smallSwanPlants').value = '';
    document.getElementById('in_mediumSwanPlants').value = '';
 document.getElementById('in_largeSwanPlants').value = '';
    document.getElementById('in_extraLargeSwanPlants').value = '';

   // const SWANPLANTINPUTS = document.getElementsByClassName('in_orderForm');
//SWANPLANTINPUTS.value = '';

  }

/*********************************************/
// fbP_backToTop()
// Called: When the user clicks the back to top arrow in the footer
// Does: Takes the user back to the top of the page
// Calls: n/a
/*********************************************
function fbP_backToTop(){
console.log("backToTop(): Start");

    // for Google and others
  document.documentElement.scrollTop = 0; 

    // for Safari
  document.body.scrollTop = 0; 

  console.log("backToTop(): Completed");
}
*/