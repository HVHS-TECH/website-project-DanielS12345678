
/*********************************************/
// fbP_zoomOnPlant()
// Called: When the user loads on to a close view page
// Does: Controls the zoom on the swan plant Image 
// Calls: n/a
/*********************************************/
function fbP_zoomOnPlant() {

  const ZOOMASMALLIMAGE = document.getElementById('i_closeSmallSwanPlant');
    //const ZOOMAMEDIUMIMAGE = document.getElementById('i_closeMediumSwanPlant');
  //const ZOOMALARGEIMAGE = document.getElementById('i_closeLargeSwanPlant');
  //const ZOOMAEXLARGEIMAGE = document.getElementById('i_closeExtraLargeSwanPlant');

    var currentZoom = 1;
    const ZOOMSPEED = 0.3; 


  /***** Small Image Zoom *****/
  // listening for the scroll wheel on the image 
    ZOOMASMALLIMAGE.addEventListener('wheel', (zoom) => {
   
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

     ZOOMASMALLIMAGE.style.transform = `scale(${currentZoom})`;
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
const ISMALLSWANPLANT = document.getElementById('i_smallSwanPlant');
const IMEDSWANPLANT = document.getElementById('i_mediumSwanPlant');
const ILARGESWANPLANT = document.getElementById('i_largeSwanPlant');
const IEXLARGESWANPLANT = document.getElementById('i_extraLargeSwanPlant');

const DSMALLSWANPLANT = document.getElementById('d_smallSwanPlant');
const DMEDSWANPLANT = document.getElementById('d_mediumSwanPlant');
const DLARGESWANPLANT = document.getElementById('d_largeSwanPlant');
const DEXLARGESWANPLANT = document.getElementById('d_extraLargeSwanPlant');




function startone(){
console.log("startone()")
const DSMALLSWANPLANT = document.getElementById('d_smallSwanPlant')
const DMEDSWANPLANT = document.getElementById('d_mediumSwanPlant')

DSMALLSWANPLANT.addEventListener("mouseenter", fbp_viewEnterSmall());
DSMALLSWANPLANT.addEventListener("mouseleave", fbp_viewExitSmall());


DMEDSWANPLANT.addEventListener("mouseenter", fbp_viewEnterMed());
DMEDSWANPLANT.addEventListener("mouseleave", fbp_viewExitMed());

DLARGESWANPLANT.addEventListener("mouseenter", fbp_viewEnterLarge());
DLARGESWANPLANT.addEventListener("mouseleave", fbp_viewExitLarge());

DEXLARGESWANPLANT.addEventListener("mouseenter", fbp_viewEnterExlarge());
DEXLARGESWANPLANT.addEventListener("mouseleave", fbp_viewExitExlarge());

}


function fbp_viewEnterSmall(){

  const ISMALLSWANPLANT = document.getElementById('i_smallSwanPlant');
const DSMALLSWANPLANT = document.getElementById('d_smallSwanPlant');

const DMEDSWANPLANT = document.getElementById('d_mediumSwanPlant')

const DLARGESWANPLANT = document.getElementById('d_largeSwanPlant');
const DEXLARGESWANPLANT = document.getElementById('d_extraLargeSwanPlant');


  const PLANTGRIDBOT = document.getElementById('d_viewPlantsGridBot')

  // Small image
  ISMALLSWANPLANT.style.width = '100%';
  ISMALLSWANPLANT.style.height = '100%';
  ISMALLSWANPLANT.style.margin = '0%';
  // Medium div
  /*
 DSMALLSWANPLANT.style.height='73.8%';
    DMEDSWANPLANT.style.height='73.8%'; /* '73.3%*

    PLANTGRIDBOT.style.marginTop='4.4%';
/*
    DLARGESWANPLANT.style.marginTop='5.5%';
    DEXLARGESWANPLANT.style.marginTop='5.5%';
 /* DMEDSWANPLANT.style.height='73.3%'; */ /* 58.6*

   PLANTGRID.style.gridTemplateRows=' 1fr 0.977fr'
*/
console.log("start");
}


function fbp_viewExitSmall(){
  const PLANTGRIDBOT = document.getElementById('d_viewPlantsGridBot')

const ISMALLSWANPLANT = document.getElementById('i_smallSwanPlant');
const DSMALLSWANPLANT = document.getElementById('d_smallSwanPlant')
const DMEDSWANPLANT = document.getElementById('d_mediumSwanPlant')

const DLARGESWANPLANT = document.getElementById('d_largeSwanPlant');
const DEXLARGESWANPLANT = document.getElementById('d_extraLargeSwanPlant');


/**/ 
ISMALLSWANPLANT.style.width = '90%';
ISMALLSWANPLANT.style.height = '90%';
ISMALLSWANPLANT.style.margin = '5%'; 

/*
DSMALLSWANPLANT.style.height='75%';
DMEDSWANPLANT.style.height='75%';
/**
PLANTGRIDBOT.style.marginTop ='5%';
/*
   DLARGESWANPLANT.style.marginTop='7.5%';
DEXLARGESWANPLANT.style.marginTop='7.5%';
   /*
#d_viewPlantsGrid{
  display:grid;
  grid-template-columns: repeat(2,1fr);
  grid-template-rows: repeat(2, 1fr);
margin-bottom:10%;
}

   
   PLANTGRID.style.gridTemplateRows=' repeat(2, 1fr)'
*/
console.log("end");
}



function fbp_viewEnterMed(){
  const IMEDSWANPLANT = document.getElementById('i_mediumSwanPlant');
const DSMALLSWANPLANT = document.getElementById('d_smallSwanPlant')
const DMEDSWANPLANT = document.getElementById('d_mediumSwanPlant')


// MED image 
  IMEDSWANPLANT.style.width = '100%';
  IMEDSWANPLANT.style.height = '100%';
  IMEDSWANPLANT.style.margin = '0%';
  // Small div

   /*
 DSMALLSWANPLANT.style.height='73.8%';
    DMEDSWANPLANT.style.height='73.8%'; /* '73.3%*
    */
}


function fbp_viewExitMed(){

   const IMEDSWANPLANT = document.getElementById('i_mediumSwanPlant');
const DSMALLSWANPLANT = document.getElementById('d_smallSwanPlant')
const DMEDSWANPLANT = document.getElementById('d_mediumSwanPlant')


  IMEDSWANPLANT.style.width = '90%';
IMEDSWANPLANT.style.height = '90%';
IMEDSWANPLANT.style.margin = '5%';
/*
DSMALLSWANPLANT.style.height='75%'; 
DMEDSWANPLANT.style.height='75%';
*/
}



function fbp_viewEnterLarge(){
const ILARGESWANPLANT = document.getElementById('i_largeSwanPlant');

const DLARGESWANPLANT =  document.getElementById('d_largeSwanPlant');

const DEXLARGESWANPLANT =  document.getElementById('d_extraLargeSwanPlant');

  // MED image 
  ILARGESWANPLANT.style.width = '100%';
  ILARGESWANPLANT.style.height = '100%';
  ILARGESWANPLANT.style.margin = '0%';
  // Small div
/*
  DLARGESWANPLANT.style.height='74%'; 
DEXLARGESWANPLANT.style.height='74%';
console.log("hihih")
*/
}

function fbp_viewExitLarge(){
  const ILARGESWANPLANT = document.getElementById('i_largeSwanPlant');
const IEXLARGESWANPLANT = document.getElementById('i_extraLargeSwanPlant');
const DLARGESWANPLANT =  document.getElementById('d_largeSwanPlant');

const DEXLARGESWANPLANT =  document.getElementById('d_extraLargeSwanPlant');

  ILARGESWANPLANT.style.width = '90%';
ILARGESWANPLANT.style.height = '90%';
ILARGESWANPLANT.style.margin = '5%';

/*
DLARGESWANPLANT.style.height='75%'; 
DEXLARGESWANPLANT.style.height='75%';
console.log("ihihipio")
*/
}

function fbp_viewEnterExLarge(){
const IEXLARGESWANPLANT = document.getElementById('i_extraLargeSwanPlant');

const DLARGESWANPLANT =  document.getElementById('d_largeSwanPlant');

const DEXLARGESWANPLANT =  document.getElementById('d_extraLargeSwanPlant');

  // MED image 
  IEXLARGESWANPLANT.style.width = '100%';
  IEXLARGESWANPLANT.style.height = '100%';
  IEXLARGESWANPLANT.style.margin = '0%';
  // Small div

}


function fbp_viewExitExLarge(){
  const ILARGESWANPLANT = document.getElementById('i_largeSwanPlant');
const IEXLARGESWANPLANT = document.getElementById('i_extraLargeSwanPlant');

const DLARGESWANPLANT =  document.getElementById('d_largeSwanPlant');

const DEXLARGESWANPLANT =  document.getElementById('d_extraLargeSwanPlant');

  IEXLARGESWANPLANT.style.width = '90%';
IEXLARGESWANPLANT.style.height = '90%';
IEXLARGESWANPLANT.style.margin = '5%';

/*
DLARGESWANPLANT.style.height='75%'; 
DEXLARGESWANPLANT.style.height='75%';
*/
}


