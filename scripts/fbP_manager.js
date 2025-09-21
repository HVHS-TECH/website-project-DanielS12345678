/*********************************************/
// fbP_manager.js()
// processes reads, and writes 
// Has other fucntions non read or write fucntions  
/*********************************************/

// users details 
var fbP_userDetails = {
  name: '',
  email: '',
  uid: '',
};

// calling initalise 
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

  // Check if firebase already initialised
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    database = firebase.database();
  }

  // firebase ext:install firebase/firestore-send-email --project=webdevelopment-d-saunders-2025

}

/*********************************************/
// fbP_zoomOnPlant()
// Called: When the user loads on to a close view page
// Does: Controls the zoom on the swan plant Images:
// when the user scrolls over it  
// Calls: n/a
/*********************************************/
function fbP_zoomOnPlant() {

  // constants and vars
  const ZOOMIMAGE = document.getElementById('i_closeViewSwanPlant');
  const ZOOMSPEED = 0.3;

  var currentZoom = 1;

  /***** Image Zoom *****/
  // listening for the scroll wheel on the image 
  ZOOMIMAGE.addEventListener('wheel', (zoom) => {

    //  Determines what way is the user zooming 
    // -1 is out  1 is in 
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
    readStatus = "ok";
  }

  if (readStatus == "ok") {
    console.log("fbP_procReadForAccount(): OK for path = " + _path + " key = " + _key);
    /** account data in DB so login data doesn't need to be writen to DB **/

    // hiding the checking account div
    document.getElementById("d_checkingAcount").style.display = "none";

    // displaying the form, header and footer
    document.getElementById("d_formElements").style.display = "block";
    document.getElementById("h_header").style.display = "block";
    document.getElementById("f_footer").style.display = "block";

    // putting values from account into form 
    document.getElementById('in_name').value = fbP_userDetails.name;
    document.getElementById('in_email').value = fbP_userDetails.email;

  } else if (readStatus == "no record") {
    console.log("fbP_procReadForAccount(): no record for path = " + _path + " key = " + _key);
    /** no account data in DB login data will be writen to DB **/

    // Writing the users account
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

    // hiding checking account div 
    document.getElementById("d_checkingAcount").style.display = "none";

    // displaying form, heading and footer
    document.getElementById("d_formElements").style.display = "block";
    document.getElementById("h_header").style.display = "block";
    document.getElementById("f_footer").style.display = "block";

    // putting values from account into form 
    document.getElementById('in_name').value = fbP_userDetails.name;
    document.getElementById('in_email').value = fbP_userDetails.email;

  }
  console.log("fbP_procWriteLoginData(): COMPLETED");

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

  if (document.getElementById("f_orderForm").checkValidity()) {
    // input vars 
    var name = document.getElementById("in_name").value;
    var email = document.getElementById("in_email").value;
    var small = document.getElementById("in_smallSwanPlants").value;
    var medium = document.getElementById("in_mediumSwanPlants").value;
    var large = document.getElementById("in_largeSwanPlants").value;
    var extraLarge = document.getElementById("in_extraLargeSwanPlants").value;

    // customer hasn't changed pre filled form data
    if (name == '' && email == '') {
      console.log("Customer has not changed name or email");

      fbP_order = {
        name: fbP_userDetails.name,
        email: fbP_userDetails.email,
        uid: fbP_userDetails.uid,
        sSP: small,
        mSP: medium,
        lSP: large,
        elSP: extraLarge,
      };

      // customer chnaged order name 
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
      };

      // cutomer chnaged order email
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
      };

      // customer chnaged both name and email
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
      };

    }

    // writing order
    fb_writeRec("orders", fbP_userDetails.uid, fbP_order, fbP_procWriteOrder);

  } else {

    console.log("fbP_orderMade() Customer has entered incorrect details");
    alert("You have made an error in the form");
  }
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
  console.log("path is " + _path + " key is " + _key);

  // stock
  fbP_stock = {
    sSP: _data.sSP,
    mSP: _data.mSP,
    lSP: _data.lSP,
    elSP: _data.elSP,
  };

  console.table(fbP_stock);

  // reading for quantity 
  fb_readStockSold("quantitySold", fbP_stock, fbP_procReadStockSold);

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
  console.log("Path is  " + _path);

  Number(_save.sSP);
  Number(dbData.sSP);
  console.log(Number(_save.sSP));
  console.log(Number(dbData.sSP));

  // adding new stock sold to old stock old 
  if (readStatus == "ok") {
    var qsSP = Number(_save.sSP) + Number(dbData.sSP);
    console.log(qsSP);
    var qmSP = Number(_save.mSP) + Number(dbData.mSP);
    console.log(qmSP);
    var qlSP = Number(_save.lSP) + Number(dbData.lSP);
    console.log(qlSP);
    var qelSP = Number(_save.elSP) + Number(dbData.elSP);
    console.log(qelSP);

    // stock sold
    fbP_stock = {
      sSP: qsSP,
      mSP: qmSP,
      lSP: qlSP,
      elSP: qelSP,
    };

    console.table(fbP_stock);

    // writing stock sold
    fb_writeQuantitySold("quantitySold", fbP_stock, fbP_procWriteQuantitySold);

    // if no stock has been sold 
  } else if (readStatus == 'no record') {
    // no quantity sold in database 
    var qsSP = Number(_save.sSP);
    console.log(qsSP);
    var qmSP = Number(_save.mSP);
    console.log(qmSP);
    var qlSP = Number(_save.lSP);
    console.log(qlSP);
    var qelSP = Number(_save.elSP);
    console.log(qelSP);

    fbP_stock = {
      sSP: qsSP,
      mSP: qmSP,
      lSP: qlSP,
      elSP: qelSP,
    };

    // writng stock sold 
    fb_writeQuantitySold("quantitySold", fbP_stock, fbP_procWriteQuantitySold);
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


  if (_error != null) {
    // error
    console.log("There is an error in fbP_procWriteQuantitySold(): for path = " + _path);
    console.error("This is the error " + _error);

    /** A message telling them about the error **/
    alert("An error has occured see console for details");

  } else {
    //no error
    console.log("fbP_procWriteQuantitySold(): no error in making write");
    document.getElementById("d_formElements").style.display = "none";
    document.getElementById("d_footerGrid").style.display = "none";
  }

}




/**************************************************************/
// fbP_clearForm()
// called when the user clicks clear at the bottom of the form
// clears the form values to nothing
/**************************************************************/
function fbP_clearForm() {

  // clearing form values
  document.getElementById('in_name').value = '';
  document.getElementById('in_email').value = '';
  document.getElementById('in_smallSwanPlants').value = '';
  document.getElementById('in_mediumSwanPlants').value = '';
  document.getElementById('in_largeSwanPlants').value = '';
  document.getElementById('in_extraLargeSwanPlants').value = '';

}


/***************************************************************
 * END OF CODE
 ***************************************************************/