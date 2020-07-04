import Recipe from './models/Recipe';
import Search from './models/Search';
import List from './models/List';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import {elements, renderLoader,clearLoader} from './views/base';




const state={};


/*

                                     Search Controller


  */

const controlSearch=async (e)=>{

    e.preventDefault();
    
    const query=searchView.getInput();
     //const query='pizza';

    if(query){

        searchView.clearInput();
        searchView.clearResults();


        renderLoader(elements.searchRes);        

      state.search=new Search(query);
      try{

        await state.search.getResults();

        
      
        clearLoader();
  
        searchView.renderResult(state.search.result);

      }
      catch(error){

        console.log(error);
        clearLoader();
      }

     
      
      

   }
         
};

const resultButton=e=>{
      
          const btn=e.target.closest('.btn-inline');
          if(btn){
            const goToPage=parseInt(btn.dataset.goto,10);
            //console.log(goToPage);
            searchView.clearResults();
  
            searchView.renderResult(state.search.result,goToPage);

          }
          

};

elements.searchResPages.addEventListener('click',resultButton);

elements.searchForm.addEventListener('submit',controlSearch);




/*

                                     Recipe Controller


  */

const controlRecipe=async ()=>{

  recipeView.clearRecipe();
  
const id=window.location.hash.replace('#','');



if(id){

  renderLoader(elements.recipe);
  

  state.recipe =  new Recipe(id);
  //window.r=state.recipe
  
  try{

    await  state.recipe.getRecipe();
    
    state.recipe.parseIngredients();
  state.recipe.calcTime();
  state.recipe.calcServings();


  
  //

  //console.log(state.recipe);
  
  clearLoader();
  
  recipeView.renderRecipe(state.recipe);
  
  

  
  

  }catch(error){

    console.log(error);

  }
  

}

};

['hashchange','load'].forEach(event=>window.addEventListener(event,controlRecipe));





/*************************************************************
 * 
 *
 *                                            List controller
 * 
 * 
 ****************************************************************/

const updateServings=e=>{

  if(e.target.matches('.btn-decrease,.btn-decrease *')){

    if(state.recipe.servings>1){
      state.recipe.updateServings('dec');

      recipeView.updateRecipeServings(state.recipe);
    }
    
  }else if(e.target.matches('.btn-increase,.btn-increase *')){
    state.recipe.updateServings('inc');
    recipeView.updateRecipeServings(state.recipe);
  }
  else if (e.target.matches('.recipe__btn--add,recipe__btn--add *')){

    controlList();
    
    
  }
  //console.log(state.recipe);
};

const controlList=()=>{

  if(!state.list) state.list=new List();

  state.recipe.ingredients.forEach(el=>{

    const item=state.list.addItem(el.count,el.unit,el.ingredient);
    //console.log(item);
    listView.renderItem(item);
    
  });

};

const updateDLTItem=e=>{

  const id=e.target.closest('.shopping__item').dataset.itemid;

  if(e.target.matches('.shopping__delete,.shopping__delete *')){

    state.list.deleteItem(id);

    listView.deleteItem(id);
  }
  else if(e.target.matches('.shopping__count-value')){

    const val=parseFloat(e.target.value);
    state.list.updateCount(id,val);
  }
}



elements.recipe.addEventListener('click',updateServings);
elements.shopping.addEventListener('click',updateDLTItem);


 


 window.l=new List();