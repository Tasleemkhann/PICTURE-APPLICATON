const categoryInput = document.getElementById("categoryInput");
const searchButton = document.getElementById("searchButton");
const gallery = document.querySelector(".gallery");

searchButton.addEventListener("click", () => {
  const category = categoryInput.value;
  if (category) {
    fetchImages(category);
  }
});

function fetchImages(category) {
  const apiKey = "fU9PLGZgHIzzktEBDWAf5As1M66JhdApBMK8LnDA97o";
  const apiUrl = `https://api.unsplash.com/search/photos?query=${category}&client_id=${apiKey}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      displayImages(data.results);
    })
    .catch((error) => {
      console.error("Error fetching images:", error);
    });
}

function displayImages(images) {
  gallery.innerHTML = "";

  images.forEach((image) => {
    const galleryItem = document.createElement("div");
    galleryItem.classList.add("gallery-item");

    const img = document.createElement("img");
    img.src = image.urls.small;
    img.alt = image.alt_description;

    const author = document.createElement("p");
    author.textContent = `By ${image.user.name}`;

    const description = document.createElement("p");
    description.textContent = image.description || "No description available";

    const link = document.createElement("a");
    link.textContent = "View on Unsplash";
    link.href = image.links.html;
    link.target = "_blank";

    galleryItem.appendChild(img);
    galleryItem.appendChild(author);
    galleryItem.appendChild(description);
    galleryItem.appendChild(link);

    gallery.appendChild(galleryItem);
  });
}
