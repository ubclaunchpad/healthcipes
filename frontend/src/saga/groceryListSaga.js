
import {
    GET_GROCERY
   } from '../actions/groceryListActions';
   
// Getting the Grocery List: 
// Input: User ID 
// Output: Grocery List 
function* getGroceryCall(param) {
    try {
      const apiConfig = {
        method: 'get',
        // MAKE SURE THE URL IS RIGHT
        // url: `${API_URL}/grocery_list?user_id=${param.userID}`,
        url: 'http://localhost:8080/grocery_list/?user_id=Qnj6AjQOLoZlJw4TZBpRE3iNz0K3',
        headers: {
          'Content-Type': 'application/json',
        },
      };
  
      const response = yield call(axios, apiConfig);
      const results = response.data;
      console.log('[INFO]: GETTING GROCERY API:');
      console.log(results); 
      console.log(results[1]); 
      yield all(
        results.data.map(item => {
          const category = item[2];
          const name = item[1];
          const id = item[0];
          console.log("Catergory of the item --> ", category ); 
          console.log("name of the item --> ", name ); 
          console.log("ID of the item --> ", id ); 
          return call(addToGrocery, {category, name, id});
         
        }),
      );
      
    } catch (e) {
      console.log('Get Grocery Failed: ' + e);
    }
  }
  
  export function* getGroceryList() {
    yield takeLatest(GET_GROCERY, getGroceryCall);
  }

