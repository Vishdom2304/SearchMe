# Search Functionality | Smallcase

This is a frontend assessment for intern position given by Smallcase.
Search Functionality is basically a react app embedded with automatic seach feature as the user types his query in the search box. 
It displays the search results in a paginated view with 5 results per page. 

### Tech Stacks used :- 
1) React.js
2) Create React app
3) Bootstrap Library
4) Axios
5) The API used here is google search v3 API that I subscribed from the RapidAPI website (the Basic (free) plan).
6) Apart from that I used some npm packages, which are :- 
   1) localstorage-ttl npm package for cacheing the search results for some time.
   2) Framer motion package for some animations on the page. 

### Features of Search Functionality app :- 
1) Embedded with search function. 
2) Paginated result view, 5 responses per page.
3) Load More button to load the next set of result. 
4) Search happens automatically as the user types. 

### For API usage optimization, following things are done :- 
1) Search results are begin cached for some time (here, 60 sec, can be increased or decreased if needed) so as to minimize the number of API calls.
2) The Search happens only after user has typed in atleast 3 letters. 
3) The code is written to wait for some time for the user to finish typing (here, 3 sec, can be increased or decreased if needed) so as to avoid sending api calls for intermediate states. 
4) The Code also handles the order in which the queries are sent so that the UI is stable and consistent.

#### Due to the time contraints I was not able to give a lot of attention to the CSS part but I tried making it smooth and polished and also tried to design it in some  accordance with the smallcase website. 

#### The Website is hosted on Netlify and the link to the hosted website is added in the description section. 
