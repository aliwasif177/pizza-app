import {key , recipeGetLink} from '../config';
export default class{

    constructor(id){

        this.id=id;
    };

    async getRecipe(){
          try{

            

            const res=await  fetch(`${recipeGetLink}?key=${key}&rId=${this.id}`);
           
            const myres= await res.json();
            this.result=myres.recipe;
            
            this.title=this.result.title;
            this.author=this.result.publisher;
            this.img=this.result.image_url;
            this.url=this.result.source_url;
            this.ingredients=this.result.ingredients;


          }catch(error){
              
            console.log(error);

          }
            
    };

    calcTime(){
        
        const numIng=this.ingredients.length;
        const periods=Math.ceil(numIng/3);
        this.time=periods*15;

    };

    calcServings(){

        this.servings=4;
    };

    parseIngredients(){


      //convert long to shorts

        const unitsLong=['tablespoons','tablespoon','ounces','ounce','teaspoons','teaspoon','cups','pounds'];
        const unitsShort=['tbsp','tbsp','oz','oz','tsp','tsp','cup','pound'];
        const units=[...unitsShort,'kg','g'];


        const  newIngridients=this.ingredients.map(el=>{

          let  ingredient=el.toLowerCase();

          unitsLong.forEach((unit,i)=>{
          

            ingredient=ingredient.replace(unit,unitsShort[i]);

            

          });
          ingredient=ingredient.replace(/ *\([^)]*\) */g, " ");

          const arrayIng=ingredient.split(' ');
          //const unit;

          let unit= arrayIng.findIndex(el2=>units.includes(el2));

          //console.log(hy);
          //console.log(ingredient);
         // console.log(unit);

          //console.log(arrayIng[unit]);
          let objIng;

            if(unit>-1){

              const countArr=arrayIng.slice(0,unit);
                
              let count;
              if(countArr.length===1){
                count=eval(arrayIng[0].replace('-','+'));


              }
              else if(countArr.length>1){

                count=eval(countArr.slice(0,unit).join('+'));
              }

              objIng={
                count:count,
                unit:arrayIng[unit],
                ingredient:arrayIng.slice(unit+1).join(' ')

              };

              //console.log(objIng.ingredient);

            }else if(unit===0){

              objIng={
                count:1,
                unit:'',
                ingredient,

              };


            }else if(parseInt(arrayIng[0],10)){


              objIng={
                count:parseInt(arrayIng[0],10),
                unit:'',
                ingredient:arrayIng.slice(1).join(' ')

              };

            }
            else if(unit===-1){

              objIng={
                count:1,
                unit:'',
                ingredient,
              }
            }

          

          return objIng;

          });

          this.ingredients=newIngridients;

          //remove parenthesis

          



    };

     updateServings(type){

     const newServings=type==='inc'? this.servings+1:this.servings-1;

     this.ingredients.forEach(el=>{

      el.count*=(newServings/this.servings);
     });

     this.servings=newServings;

     };



  }


