
// use of search_api is to recommend movieS which you will type in search box

//START

function reload(){

  let movie = document.getElementById('movie').value;    // user input the name of the movie


  if(movie == ""){
    window.location.reload();
  }

}



function search_api(){



  let movie = document.getElementById('movie').value;  // user input the name of the movie

  


const URL = 'https://movie-recommendation-api.herokuapp.com/movie?title='

a  = document.createElement('a');
a.href = URL;  //  recommendation api url without title



const omdbapi = 'https://www.omdbapi.com/?apikey=28a0ca92&s='


b  = document.createElement('a');
b.href = omdbapi;      // omdb_api url without s






// recomemndation api url

var add = 'title=' + movie;  // after ? for adding title

let params = new URLSearchParams(a.search)  //search from ? in url
params.delete('title')
const first = URL.split("?")[0] // before ?
const URLwithoutGCLID = `${first}?${add}` 



//omdb api url

var omdb_s = '&s=' + '' ;  // after ? for adding title

let params1 = new URLSearchParams(b.search)  //search from ? in url

params.delete('s')
const first1 = URL.split("?")[0] // before ?
const URLwithoutGCLID1 = `${first1}?${omdb_s}` //  



poster_search(movie);  // poster of movie you typed




 // use of  URLwithoutGCLID is to see the link
//END

//USE OF FETCH IS TO READ FROM API

//START OF RECOMMENDATION MOVIES
fetch(URLwithoutGCLID)
.then((res) => res.json())
.then((data) => {
  let output =  "<h1>"+ "SIMILAR MOVIES TO"+ " "+ movie.toUpperCase()+" ";
  /*contains all movie name*/
  data.forEach(function(post){
 
   
   
   
    
    
    
    str = post.Name.replaceAll(" " , "%20")
 
     omdb_link = b + str   // omdb uri with recommendation
    
    

    
     poster(omdb_link)  // poster of recommendation
    
    
  });
  


  document.getElementById('output').innerHTML = output;

 
})

.catch((err) => console.log("NOT FOUND"))
//END OF RECOMMENDATION MOVIES




}

//  STARTS poster of recommendation

function poster(omdb_link){   
 
  
  
  fetch(omdb_link)    
  .then(function(res){
    return res.json();         
  })
  .then(function(data){
    data = JSON.stringify(data)
    data=JSON.parse(data)
    console.log(data.Search[0].Title); 
    console.log(data.Search[0].imdbID);  // manipulate this
    
   
    document.getElementById('rec_poster').innerHTML +=   "<ul> <li><img src= '"+data.Search[0].Poster+"'> <li></ul>"; // poster of recommendation src
    reload();
  });
    
//  ENDS poster of recommendation





}

// STARTS poster of movie you typed


function poster_search(movie){   

  search_poster = b + movie; // omdb url with typed movie 

     
  fetch(search_poster)    
  .then(function(res){
    return res.json();         
  })
  .then(function(data){
    data = JSON.stringify(data)
    data=JSON.parse(data)
    let movie_poster = data.Search[0].poster;
  
    
    document.getElementById('poster').innerHTML = "<h1>"+ "QUERY MOVIE"+ ": "+ movie.toUpperCase()+"</h1><br> <img src= '"+data.Search[0].Poster+"'>";
      //shows the poster of the movie you typed
  });

 
}

// ENDS poster of movie you typed










