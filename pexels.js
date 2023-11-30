
const apiKey = 'Z0SX5o6iJCF8DJU2BjIMCsPd73ocksUY3H5vxIKQNIJso9Jw9RCBR4pp'; // Replace with your Pexels API key


async function fetchImages(query, perPage, orien) {
  try {
    const response = await fetch(`https://api.pexels.com/v1/search?orientation=${orien}&query=${query}&per_page=${perPage}`, {
      headers: {
        Authorization: apiKey,
      },
    });

    if (!response.ok) {
      throw new Error('Unable to fetch images from Pexels');
    }

    const data = await response.json();
    return data.photos;
  } catch (error) {
    console.error(error.message);
    return [];
  }
}

async function displayImages(query) {
  const gallery = document.getElementById('gallery');
  gallery.innerHTML = ''; // Clear previous images

  const images = await fetchImages(query, 50);

  images.forEach(photo => {
    const imageContainer = document.createElement('div');
    imageContainer.classList.add('image-container');

    const img = document.createElement('img');
    img.src = photo.src.large;
    img.alt = photo.url;
    img.addEventListener("click", function(){
        console.log(img.src)
        loadImageFromURL(img.src)
    })

    imageContainer.appendChild(img);
    gallery.appendChild(imageContainer);
  });
}

// Initial display

// You can change the search query dynamically as needed
// For example, you can call displayImages('cars') to fetch and display car images


document.getElementById("searchBtnPexel").addEventListener("click", function(){
    let inputSearchForPexel = document.getElementById("searchPexelInput")
    displayImages(inputSearchForPexel.value);

})

async function getAccImage(imageKeyword){
    function generateRandomNumber() {
        // Generate a random number between 0 (inclusive) and 1 (exclusive)
        const random = Math.random();
      
        // Scale and shift the random number to the desired range (1 to 10)
        const randomNumber = Math.floor(random * 10) + 1;
      
        return randomNumber;
      }
    const images = await fetchImages(imageKeyword, 12, "portrait")
    loadImageFromURL(images[0].src.large, true)
}

