// Retrieve HTML elements
const searchInput = document.getElementById('search');
const searchButton = document.getElementById('searchButton');
const results = document.getElementById('results');

// Look for user exact coincidence on each page, and print name, ID, and URL
const searchUser = async () => {
 
  // Get input search string value
  const searchText = searchInput.value;
  
  try {
    // kickstart the search on the the first page of the endpoint
    let pokeapi = 'https://pokeapi.co/api/v2/pokemon/?limit=20&offset=0';

    // Use a while loop to iterate through pages until the exact match is found
    while (pokeapi) {
      // Fetch the first page of the API
      const response = await fetch(pokeapi);
      const data = await response.json();

      // Iterate on each user on the current page
      for (const user of data.results) {
        //  Determine if the name of the iteration is an exact match to the text on the search or not
        if (user.name === searchText) {
        
          // If true, fetch the details of the specific user using its URL
          const userResponse = await fetch(user.url);
          const userData = await userResponse.json();          
         
          // Render the results
          results.innerHTML = `<p>Name: ${userData.name}</p><p>ID: ${userData.id}</p><p>URL: ${user.url}</p>`;
          
          return; // Exit the function if the user is found
        }
      }

      // Update API URL to the next page until a match is found or there are no more pages
      pokeapi = data.next;
    }

    // Text to display if no match is found on any page
    results.innerHTML = '<p>User not found.</p>';

  } catch (error) {
    results.innerHTML = '<p>Error searching for user.</p>';
    console.error('Error searching for user:', error);
  }
};

// Add an event listener to the button to trigger the search
searchButton.addEventListener('click', searchUser);


// Resources
// try catch example: https://medium.com/@biplavmazumdar5/async-await-with-try-and-catch-get-api-8df3a9d25a7b
// getting input value: https://www.w3schools.com/jsref/prop_text_value.asp
// while statement: https://www.w3schools.com/jsref/jsref_while.asp