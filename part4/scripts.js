document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  const placesList = document.getElementById('places-list');
  const priceFilter = document.getElementById('price-filter');
  const placeDetailsSection = document.getElementById('place-details');
  const reviewForm = document.getElementById('review-form');

  if (loginForm) {
    loginForm.addEventListener('submit', handleLoginSubmit);
  }

  if (placesList) {
    checkAuthenticationAndLoadPlaces();

    if (priceFilter) {
      priceFilter.addEventListener('change', filterPlaces);
    }
  }

  if (placeDetailsSection) {
    initializePlaceDetailsPage();
  }

  if (reviewForm && document.getElementById('review')) {
    initializeAddReviewPage();
  }
});

let allPlaces = [];

async function handleLoginSubmit(event) {
  event.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const errorMessage = document.getElementById('error-message');

  if (errorMessage) {
    errorMessage.textContent = '';
  }

  try {
    const response = await fetch('http://127.0.0.1:5000/api/v1/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok) {
      document.cookie = `token=${data.access_token}; path=/`;
      window.location.href = 'index.html';
    } else {
      showError(data.error || 'Login failed. Please check your credentials.');
    }
  } catch (error) {
    showError('Unable to connect to the server.');
    console.error('Login error:', error);
  }
}

function showError(message) {
  const errorMessage = document.getElementById('error-message');

  if (errorMessage) {
    errorMessage.textContent = message;
  } else {
    alert(message);
  }
}

function getCookie(name) {
  const cookies = document.cookie.split(';');

  for (const cookie of cookies) {
    const trimmedCookie = cookie.trim();

    if (trimmedCookie.startsWith(`${name}=`)) {
      return trimmedCookie.substring(name.length + 1);
    }
  }

  return null;
}

async function checkAuthenticationAndLoadPlaces() {
  const token = getCookie('token');
  const loginLink = document.getElementById('login-link');

  if (loginLink) {
    loginLink.style.display = token ? 'none' : 'inline-block';
  }

  await fetchPlaces(token);
}

async function fetchPlaces(token) {
  const headers = {};

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch('http://127.0.0.1:5000/api/v1/places', {
      method: 'GET',
      headers: headers
    });

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const places = await response.json();
    allPlaces = places;
    displayPlaces(allPlaces);
  } catch (error) {
    console.error('Error fetching places:', error);

    const placesList = document.getElementById('places-list');
    if (placesList) {
      placesList.innerHTML = '<p>Unable to load places.</p>';
    }
  }
}

function displayPlaces(places) {
  const placesList = document.getElementById('places-list');

  if (!placesList) {
    return;
  }

  placesList.innerHTML = '';

  places.forEach((place) => {
    const article = document.createElement('article');
    article.className = 'place-card';

    const title = place.title || place.name || 'Unnamed place';
    const description = place.description || 'No description available.';
    const price = place.price || place.price_by_night || 0;
    const placeId = place.id || '';

    article.innerHTML = `
      <h2>${title}</h2>
      <p><strong>Price per night:</strong> $${price}</p>
      <p>${description}</p>
      <a href="place.html?id=${placeId}" class="details-button">View Details</a>
    `;

    placesList.appendChild(article);
  });
}

function filterPlaces() {
  const priceFilter = document.getElementById('price-filter');
  const selectedValue = priceFilter.value;

  if (selectedValue === 'all') {
    displayPlaces(allPlaces);
    return;
  }

  const maxPrice = parseInt(selectedValue, 10);

  const filteredPlaces = allPlaces.filter((place) => {
    const price = place.price || place.price_by_night || 0;
    return price <= maxPrice;
  });

  displayPlaces(filteredPlaces);
}

function getPlaceIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
}

async function initializePlaceDetailsPage() {
  const token = getCookie('token');
  const loginLink = document.getElementById('login-link');
  const addReviewSection = document.getElementById('add-review');
  const addReviewLink = document.getElementById('add-review-link');
  const placeId = getPlaceIdFromURL();

  if (loginLink) {
    loginLink.style.display = token ? 'none' : 'inline-block';
  }

  if (addReviewSection) {
    addReviewSection.style.display = token ? 'block' : 'none';
  }

  if (!placeId) {
    const placeDetailsSection = document.getElementById('place-details');
    if (placeDetailsSection) {
      placeDetailsSection.innerHTML = '<p>Place ID not found in URL.</p>';
    }
    return;
  }

  if (addReviewLink) {
    addReviewLink.href = `add_review.html?id=${placeId}`;
  }

  await fetchPlaceDetails(token, placeId);
}

async function fetchPlaceDetails(token, placeId) {
  const headers = {};

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`http://127.0.0.1:5000/api/v1/places/${placeId}`, {
      method: 'GET',
      headers: headers
    });

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const place = await response.json();
    displayPlaceDetails(place);
  } catch (error) {
    console.error('Error fetching place details:', error);

    const placeDetailsSection = document.getElementById('place-details');
    if (placeDetailsSection) {
      placeDetailsSection.innerHTML = '<p>Unable to load place details.</p>';
    }
  }
}

function displayPlaceDetails(place) {
  const placeDetailsSection = document.getElementById('place-details');
  const reviewsSection = document.getElementById('reviews');

  if (!placeDetailsSection || !reviewsSection) {
    return;
  }

  const title = place.title || place.name || 'Unnamed place';
  const description = place.description || 'No description available.';
  const price = place.price || place.price_by_night || 0;
  const host = place.owner || place.host || place.owner_id || 'Unknown host';
  const amenities = place.amenities || [];
  const reviews = place.reviews || [];

  placeDetailsSection.innerHTML = `
    <h1>${title}</h1>
    <div class="place-info">
      <p><strong>Host:</strong> ${formatHost(host)}</p>
      <p><strong>Price:</strong> $${price} / night</p>
      <p><strong>Description:</strong> ${description}</p>
      <div class="amenities-block">
        <strong>Amenities:</strong>
        <ul class="amenities-list">
          ${
            amenities.length > 0
              ? amenities.map((amenity) => `<li>${formatAmenity(amenity)}</li>`).join('')
              : '<li>No amenities available.</li>'
          }
        </ul>
      </div>
    </div>
  `;

  reviewsSection.innerHTML = '<h2>Reviews</h2>';

  if (reviews.length === 0) {
    reviewsSection.innerHTML += '<p class="no-reviews">No reviews yet.</p>';
    return;
  }

  reviews.forEach((review) => {
    const article = document.createElement('article');
    article.className = 'review-card';

    const comment = review.text || review.comment || 'No comment provided.';
    const rating = review.rating || 'N/A';
    const user = review.user || review.user_name || review.author || 'Anonymous';

    article.innerHTML = `
      <p>${comment}</p>
      <p><strong>User:</strong> ${formatUser(user)}</p>
      <p><strong>Rating:</strong> ${rating}</p>
    `;

    reviewsSection.appendChild(article);
  });
}

function formatAmenity(amenity) {
  if (typeof amenity === 'string') {
    return amenity;
  }

  return amenity.name || amenity.title || 'Unnamed amenity';
}

function formatUser(user) {
  if (typeof user === 'string') {
    return user;
  }

  return user.first_name
    ? `${user.first_name} ${user.last_name || ''}`.trim()
    : user.name || user.email || 'Anonymous';
}

function formatHost(host) {
  if (typeof host === 'string') {
    return host;
  }

  return host.first_name
    ? `${host.first_name} ${host.last_name || ''}`.trim()
    : host.name || host.email || 'Unknown host';
}

function initializeAddReviewPage() {
  const token = getCookie('token');
  const loginLink = document.getElementById('login-link');
  const placeId = getPlaceIdFromURL();
  const reviewForm = document.getElementById('review-form');
  const reviewPlaceLabel = document.getElementById('review-place-label');

  if (!token) {
    window.location.href = 'index.html';
    return;
  }

  if (loginLink) {
    loginLink.style.display = 'none';
  }

  if (!placeId) {
    setReviewMessage('Place ID not found in URL.', 'error');
    if (reviewForm) {
      reviewForm.style.display = 'none';
    }
    return;
  }

  if (reviewPlaceLabel) {
    reviewPlaceLabel.innerHTML = `<strong>Place ID:</strong> ${placeId}`;
  }

  reviewForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    await handleReviewSubmit(token, placeId);
  });
}

async function handleReviewSubmit(token, placeId) {
  const reviewText = document.getElementById('review').value.trim();
  const rating = document.getElementById('rating').value;
  const reviewForm = document.getElementById('review-form');

  setReviewMessage('', '');

  try {
    const response = await fetch('http://127.0.0.1:5000/api/v1/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        text: reviewText,
        rating: parseInt(rating, 10),
        place_id: placeId
      })
    });

    let data = {};
    try {
      data = await response.json();
    } catch (error) {
      data = {};
    }

    if (response.ok) {
      setReviewMessage('Review submitted successfully!', 'success');
      if (reviewForm) {
        reviewForm.reset();
      }
    } else {
      setReviewMessage(data.error || 'Failed to submit review.', 'error');
    }
  } catch (error) {
    console.error('Error submitting review:', error);
    setReviewMessage('Unable to connect to the server.', 'error');
  }
}

function setReviewMessage(message, type) {
  const reviewMessage = document.getElementById('review-message');

  if (!reviewMessage) {
    return;
  }

  reviewMessage.textContent = message;
  reviewMessage.className = '';

  if (type) {
    reviewMessage.classList.add(type);
  }
}