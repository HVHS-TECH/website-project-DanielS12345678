/*********************************************/
// fbP_manager.js()
// processes reads, and writes 
// Has other fucntions like zoom 
/*********************************************/

/*********************************************/
// fbP_dropDownLinksDisplay()
// Called: When the user loads on any page
// Does: senors if the user has lcikced of the drop down link 
// Used on a touchscreen device 
// Calls: n/a
/*********************************************/
function fbP_dropDownLinksDisplay(){
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