/*********************************************/
// fb_io.js()
// fucntion deals directly with database
// reads, writes and log in 
/*********************************************/


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
// fb_readForAccount(_path, _key, _save, _procFunc)
// Called by fbP_procLogin
// Read a record from DB: for the acocunt details.
// Input:
// _path is the first location point where the data is stored which is accounts
// _key is the second location point where the date is stored which is the users uid
// _save is the data the userDetails (fbP_userDetails)
// _procFunc is the function that proceess the read: fbP_procReadForAccount()
// Return: console log _path and _key
/**************************************************************/
//      fb_readForAccount('userDetails', _user.uid , fbP_userDetails, fbP_procReadRec);
function fb_readForAccount(_path, _key, _save, _procFunc) {
  console.log('fb_readForAccount(): START path = ' + _path + ' key = ' + _key);
  var readStatus = 'waiting';

  // reading 
  firebase.database().ref(_path + '/' + _key)
    .once('value', fb_readOk, fb_readErr);

  console.table(_save);

  // if no errors are caught 
  function fb_readOk(_snapshot) {
    console.log('fb_readOk()');
    var dbData = _snapshot.val();

    // dbData is the reg data
    if (dbData == null) {
      readStatus = 'no record';
      console.log('fb_readForAccount(): fb_readOk(): NO RECORD FOUND!');
    } else {
      readStatus = 'ok';
      console.log('fb_readForAccount(): fb_readOk(): READ ALL GOOD');
    }
    _procFunc(readStatus, _path, _key, dbData, _save, null);
  }

  // if an error is caught
  function fb_readErr(_error) {
    readStatus = 'error';
    _procFunc(readStatus, _path, _key, null, _save, _error);
  }
}


/**************************************************************/
// function fb_readStockSold(_path, _save, _procFunc)
// Called by fbP_procWriteOrder
// Reads the quantity sold in the database
// Input:
// _path is the first location point where the data is stored which is accounts
// _key is the second location point where the date is stored which is the users uid
// _save is the data the userDetails (fbP_userDetails)
// _procFunc is the function that proceess the read: fbP_procReadStockSold()
// Return: console log _path and _key
/**************************************************************/
function fb_readStockSold(_path, _save, _procFunc) {

  firebase.database().ref(_path)
    .once('value', fb_readOk, fb_readErr);

  // if no errors are caught 
  function fb_readOk(_snapshot) {
    console.log('fb_readOk()');
    var dbData = _snapshot.val();


    // dbData is the reg data
    if (dbData == null) {
      readStatus = 'no record';
      console.log('NO RECORD FOUND!');
    } else {
      readStatus = 'ok';
      console.log('fb_readOk(): READ ALL GOOD');
    }
    _procFunc(readStatus, _path, dbData, _save, null);
  }

  // if an error is caught
  function fb_readErr(_error) {
    readStatus = 'error';
    _procFunc(readStatus, _path, null, _save, _error);
  }
}

/**************************************************************/
//  fb_writeRec(_path, _key, _data, _procFunc); 
// Called by 
// fbP_procReadForAccount
// Writes a record to the Database
// Input: 
// _path is the first location point where the data is stored
// _key is the second location point where the data is stored
// _data is the data that is being writen
// _error if there is an error throughout the process 
// Return: 
// console log _path and _key
/**************************************************************/
function fb_writeRec(_path, _key, _data, _procFunc) {
  console.log('fb_writeRec() START: path = ' + _path + ' key = ' + _key);

  // writing
  firebase.database().ref(_path + '/' + _key)
    .set(_data, fb_writeVerify);

    // verifing 
  function fb_writeVerify(_error) {
    if (_error != null) {
      _procFunc(_path, _key, _data, _error);
    } else {
      _procFunc(_path, _key, _data, null);
    }
  }

}

/**************************************************************/
// fb_writeQuantitySold(_path, _data, _procFunc); 
// Called by 
// fbP_procReadForAccount
// Writes a record to the Database
// Input: 
// _path is the first location point where the data is stored: quantitySold
// _data is the stock data: fbP_stock
// _error if there is an error throughout the process 
// Return: 
// console log _path
/**************************************************************/
function fb_writeQuantitySold(_path, _data, _procFunc) {
  console.log('fb_writeQuantitySold() START: path = ' + _path);

  // writing 
  firebase.database().ref(_path)
    .set(_data, fb_writeVerify);

    // verifing 
  function fb_writeVerify(_error) {
    if (_error != null) {
      _procFunc(_path, _data, _error);
    } else {
      _procFunc(_path, _data, null);
    }
  }

}

/*************************************************
END OF CODE 
*************************************************/