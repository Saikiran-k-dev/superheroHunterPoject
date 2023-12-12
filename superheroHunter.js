

function searchSuperhero() {
    const searchInput = document.getElementById('searchInput').value.trim();
    var buttonId=document.getElementById('searchInput')

    if (!searchInput) {
        alert('Please enter a superhero name');
        return;
    }

    // Clear previous results
    document.getElementById('resultContainer').innerHTML = '';

    // Your Marvel API keys
    const publicKey = '90b8a9868b8166641b57bdbba31c48c3';
    const privateKey = 'd0f776a5e4eab8732abb1926bd7059e6aa830178';

    // Calculate timestamp and hash for authentication
    const timestamp = Date.now();
    const hash = CryptoJS.MD5(`${timestamp}${privateKey}${publicKey}`).toString();

    // Fetch superhero data from the Marvel API
    const apiUrl = `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${searchInput}&apikey=${publicKey}&ts=${timestamp}&hash=${hash}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.data.count === 0) {
                alert('Superhero not found. Try another name.');
                return;
            }

            displaySuperhero(data.data.results);
        })
        .catch(error => console.error('Error fetching data:', error));
        
}

function displaySuperhero(heroes) {
    const resultContainer = document.getElementById('resultContainer');

    heroes.forEach(hero => {
        const heroCard = document.createElement('div');
        heroCard.classList.add('heroCard');

        const imageUrl = hero.thumbnail.path + '.' + hero.thumbnail.extension;
        // const name = hero.name;

        heroCard.innerHTML = `
            <img src="${imageUrl}" alt="${name}">
            /
        `;

        resultContainer.appendChild(heroCard);
    });
}
