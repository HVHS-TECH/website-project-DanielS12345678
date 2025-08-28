/*********************************************/
// fbP_manager.js()
// processes reads, and writes 
// Has other fucntions non read or write fucntions  
/*********************************************/

var fbP_userDetails = {
  name: '',
  email: '',
  uid: '',
}


fbP_initialise();


/*********************************************/
// fbP_initialise()
// Called: When module is run 
// Does: initialises the firebase database 
// Calls: n/a
/*********************************************/
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
  const VIEWLINK = document.getElementById('d_headerLinkView');

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

    // reading if login data is already in database
    fb_readForAccount('accounts', _user.uid, fbP_userDetails, fbP_procReadForAccount);
  }
}

/**************************************************************/
// fbP_procReadForAccount(readStatus, _path, _key, dbData, _save, _error )
// Called by fb_readForAccount
// Processes the result of fb_readForAccount for the users account data
// Input: readStatus is the point through the process where the data is read 
// _path is the first location point where the data is stored which is accounts 
// _key is the second location point where the date is stored which is the users uid
// dbData is the account data from the database
// _save is the log in data fbP_userDetails
// _error if there is an error throughout the process 
// Return: 
// console log _path and _key
// console.error an error if any
/**************************************************************/
//                  _procFunc(readStatus, _path, _key, dbData, _save, _error);
function fbP_procReadForAccount(readStatus, _path, _key, dbData, _save, _error) {
  console.log("fbP_procReadForAccount(): Start path = " + _path + " key = " + _key);

  console.table(dbData);

  if (dbData == null) {
    readStatus = "no record";
  } else {
    readStatus = "ok"
  }

  if (readStatus == "ok") {
    console.log("fbP_procReadForAccount(): OK for path = " + _path + " key = " + _key);
    /** account data in DB so login data doesn't need to be writen to DB **/

    document.getElementById("d_checkingAcount").style.display = "none";

    document.getElementById("d_formElements").style.display = "block";
    document.getElementById("h_header").style.display = "block";
    document.getElementById("f_footer").style.display = "block";

    // putting values from account into form 
    document.getElementById('in_name').value = fbP_userDetails.name;
    document.getElementById('in_email').value = fbP_userDetails.email;

  } else if (readStatus == "no record") {
    console.log("fbP_procReadForAccount(): no record for path = " + _path + " key = " + _key);
    /** no account data in DB login data will be writen to DB **/

    fb_writeRec("accounts", fbP_userDetails.uid, fbP_userDetails, fbP_procWriteLoginData);

  } else {
    console.log("There is an error in fbP_procReadForAccount() for path = " + _path + " key = " + _key);
    console.error("This is the error " + _error);

    /** A message telling them about the error **/
    alert("An error has occured see console for details");
  }
  console.log("fbP_procReadForAccount(): COMPLETED");

}


/**************************************************************/
// fbP_orderMade()
// Called whne user clicks the order button on the order page 
// Processes the order the user made and calls the write so the order can be writen to the database
// Input: n/a
// Return: 
// console log _path and _key
// console.error an error if any
/**************************************************************/
function fbP_orderMade() {
  console.log("orderMade(): start");

  var name = document.getElementById("in_name").value;
  var email = document.getElementById("in_email").value;

  var small = document.getElementById("in_smallSwanPlants").value;
  var medium = document.getElementById("in_mediumSwanPlants").value;
  var large = document.getElementById("in_largeSwanPlants").value;
  var extraLarge = document.getElementById("in_extraLargeSwanPlants").value;


  if (name == '' && email == '') {
    console.log("Customer has not chnaged name or email");

    fbP_order = {
      name: fbP_userDetails.name,
      email: fbP_userDetails.email,
      uid: fbP_userDetails.uid,
      sSP: small,
      mSP: medium,
      lSP: large,
      elSP: extraLarge,
    }

  } else if (name != '' && email == '') {
    console.log("customer changed name for order");

    fbP_order = {
      name: name,
      email: fbP_userDetails.email,
      uid: fbP_userDetails.uid,
      sSP: small,
      mSP: medium,
      lSP: large,
      elSP: extraLarge,
    }


  } else if (name == '' && email != '') {
    console.log("customer changed email for order");

    _user.dispalyName = sessionStorage.getItem('displayName');
    cosole.log(_user.dispalyName);

    fbP_order = {
      name: fbP_userDetails.name,
      email: email,
      uid: fbP_userDetails.uid,
      sSP: small,
      mSP: medium,
      lSP: large,
      elSP: extraLarge,
    }

  } else {
    console.log("customer changed name and email for order");

    fbP_order = {
      name: name,
      email: email,
      uid: fbP_userDetails.uid,
      sSP: small,
      mSP: medium,
      lSP: large,
      elSP: extraLarge,
    }

  }

  fb_writeRec("orders", fbP_userDetails.uid, fbP_order, fbP_procWriteOrder)
}


/**************************************************************/
// fbP_procWriteOrder(_path, _key, _data, _error)
// Called by writew rec when the users order is writen to the database
// Processes the order the user made and calls the write so the order can be writen to the database
// Input: 
// _path is the first location point where the data is stored which is orders 
// _key is the second location point where the date is stored which is the users uid
// _data is the order data writen to the database: fbP_order
// _error if there is an error throughout the process 
// Return: 
// console log _path and _key
// console.error an error if any
/**************************************************************/
//    _procFunc(_path, _key, _data, _error);
function fbP_procWriteOrder(_path, _key, _data, _error) {
  console.log(_path);
  console.log(_key);
  console.log(_data);
  console.table(_data);
  console.log(_data.email)
  console.log(fbP_order.email);

  fbP_stock = {
    sSP: _data.sSP,
    mSP: _data.mSP,
    lSP: _data.lSP,
    elSP: _data.elSP,
  }

  console.table(fbP_stock);

  fb_readStockSold("quantitySold", fbP_stock, fbP_procReadStockSold)

}



/**************************************************************/
// fbP_procReadStockSold(readStatus, _path, _key, dbData, _save, _error )
// Called by fb_readForAccount
// Processes the result of fb_readForAccount for the users account data
// Input: readStatus is the point through the process where the data is read 
// _path is the first location point where the data is stored which is  quantitySold
// dbData is the quantity sold amount from the database
// _save is order fbP_stock
// _error if there is an error throughout the process 
// Return: 
// console log _path and _key
// console.error an error if any
/**************************************************************/
//                  _procFunc(readStatus, _path, _key, dbData, _save, _error);
function fbP_procReadStockSold(readStatus, _path, dbData, _save, _error) {
  console.log(_path);
  console.table(_save);
  console.table(dbData);
  console.log(_save.sSP);
  console.log(dbData.sSP);
  Number(_save.sSP);
  Number(dbData.sSP);
  console.log(Number(_save.sSP));
  console.log(Number(dbData.sSP));


  if (readStatus == "ok") {
    var qsSP = Number(_save.sSP) + Number(dbData.sSP)
    console.log(qsSP);
    var qmSP = Number(_save.mSP) + Number(dbData.mSP)
    console.log(qmSP);
    var qlSP = Number(_save.lSP) + Number(dbData.lSP)
    console.log(qlSP);
    var qelSP = Number(_save.elSP) + Number(dbData.elSP)
    console.log(qelSP);


    fbP_stock = {
      sSP: qsSP,
      mSP: qmSP,
      lSP: qlSP,
      elSP: qelSP,
    }

    console.table(fbP_stock);


     fb_writeQuantitySold("quantitySold", fbP_stock, fbP_procWriteQuantitySold)

  } else if (readStatus == 'no record') {
    // no quantity sold in database 
    var qsSP = Number(_save.sSP)
    console.log(qsSP);
    var qmSP = Number(_save.mSP)
    console.log(qmSP);
    var qlSP = Number(_save.lSP)
    console.log(qlSP);
    var qelSP = Number(_save.elSP)
    console.log(qelSP);


    fbP_stock = {
      sSP: qsSP,
      mSP: qmSP,
      lSP: qlSP,
      elSP: qelSP,
    }
     fb_writeQuantitySold("quantitySold", fbP_stock, fbP_procWriteQuantitySold)
  } else {
    console.log("There is an error in fbP_procReadStockSold() for path = " + _path);
    console.error("This is the error " + _error);

    /** A message telling them about the error **/
    alert("An error has occured see console for details");
  }
  console.log("fbP_procReadStockSold(): COMPLETED");

}

/**************************************************************/
// fbP_procWriteQuantitySold(_path, _data, _error)
// Called by fb_writeQuantitySold when the new quantity sold is writen to the database
// Processes the write of the new quantity
// Input: 
// _path is the first location point where the data is stored which is quantitySold 
// _data is the stock data: fbP_stock
// _error if there is an error throughout the process 
// Return: 
// console log _path
// console.error an error if any
/**************************************************************/
//    _procFunc(_path, _data, _error);
function fbP_procWriteQuantitySold(_path, _data, _error) {
  console.log("fbP_procWriteQuantitySold(): start for path " + _path);

  if(_error != null){
    // error
        console.log("There is an error in fbP_procWriteQuantitySold(): for path = " + _path);
    console.error("This is the error " + _error);

    /** A message telling them about the error **/
    alert("An error has occured see console for details");

  } else{
    //no error
    console.log("fbP_procWriteQuantitySold(): no error in making write");

  }

}

/**************************************************************/
//fbP_procWriteLoginData(_path, _key, _data, _error)
// Called by 
// fbP_procReadForAccount
//
// Writes a record to the Database
// Input: 
// _path is the first location point where the data is stored: accounts
// _key is the second location point where the data is stored: the users uid 
// _data is the data that has been writen: fbP_userDetails
// _error if there is an error throughout the process 
// Return: 
// console log _path and _key
/**************************************************************/
function fbP_procWriteLoginData(_path, _key, _data, _error) {
  console.log("fbP_procWriteLoginData Start for  path: " + _path + " and key: " + _key);

  if (_error != null) {
    /** if error the user will be notified with an alert **/
    console.log("fbP_procWriteLoginData(): error path = " + _path + " key = " + _key);
    console.error("fbP_procWriteLoginData(): ERROR!");
    console.log(_error);
    alert("error making delete see console log");
  } else {
    console.log("fbP_procWriteLoginData(): ok for path = " + _path + " key = " + _key);

    document.getElementById("d_checkingAcount").style.display = "none";

    document.getElementById("d_formElements").style.display = "block";
    document.getElementById("h_header").style.display = "block";
    document.getElementById("f_footer").style.display = "block";

    // putting values from account into form 
    document.getElementById('in_name').value = fbP_userDetails.name;
    document.getElementById('in_email').value = fbP_userDetails.email;

  }
  console.log("fbP_procWriteLoginData(): COMPLETED");


}


function fbP_resetForm() {

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