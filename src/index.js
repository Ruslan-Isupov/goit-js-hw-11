import './css/styles.css';
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import {searchPictures} from "./searchPictures.js";

// import {incrementPage} from "./renderFunction.js"
// import { resetPage} from "./renderFunction.js"


import {renderUserListItems} from "./renderFunction.js"
import {clearMarkup} from "./renderFunction.js" 
import {hide} from "./renderFunction.js"
import {show} from "./renderFunction.js"
import {notifySuccess} from "./renderFunction"
let page = 1;
let limit = 40;
// const queryImages = searchPictures (query)
const TOTAL_lMAGES = 500 


const form = document.querySelector("#search-form")
const gallery = document.querySelector(".gallery")
const buttonLoad = document.querySelector(".load-more")


let name = form.elements.searchQuery;

hide()


 form.addEventListener("submit",findListOfPictures)
 buttonLoad.addEventListener("click", loadAdditionalImage)


async function findListOfPictures(e){
  e.preventDefault()
  hide()
  clearMarkup()
  
 if(page > 1){
      page = 1
      limit = 40
      // limit = 100
      // resetPage(page)
  }
     
    
    try{
   let query = name.value
   const images = await searchPictures (query)
   
    
    if (images.total === 0 || name.value === ""){
      
      throw new Error()      
          
    }
   
      
      renderUserListItems(images)
      new SimpleLightbox('.gallery a').refresh()
      notifySuccess(images)
      show()
      page += 1;
      limit +=40;
    // incrementPage(page)
      
    
  }
      catch(error) {
        
        clearMarkup()
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
      )
      hide()
    }
       

 }

async function loadAdditionalImage(query){
  
  try{let query = name.value

    const images = await searchPictures (query)
    

     renderUserListItems(images)
      page += 1;
      limit +=40;
      
      // console.log(limit)
      if(limit >=TOTAL_lMAGES){
        throw new Error(images.status)
      }
    }
  

     
   
   catch (error) {
    Notiflix.Notify.failure(
      "We're sorry, but you've reached the end of search results." )
    hide()
  }
  }




// function resetPage(page) {
//   page = 1
//   console.log(page)
// };

// function  incrementPage(page) {
//     page += 1;
//     limit += 40
//     console.log(page,limit)
//   }


// const lightbox = new SimpleLightbox('.gallery a', { captionsData: 'alt', captionDelay : 250});



export {gallery}
export {buttonLoad}
export {page}


