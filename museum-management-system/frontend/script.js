document.addEventListener('DOMContentLoaded', () => {
    fetchExhibits();

    document.getElementById('add-exhibit').addEventListener('click', addExhibit);
});

function fetchExhibits() {
    fetch('http://localhost:5000/exhibits')
        .then(response => response.json())
        .then(data => {
            const exhibitList = document.getElementById('exhibit-list');
            exhibitList.innerHTML = '';
            data.forEach(exhibit => {
                exhibitList.innerHTML += `
                    <div>
                        <h3>${exhibit.name}</h3>
                        <p>${exhibit.description}</p>
                        <img src="${exhibit.image_url}" alt="${exhibit.name}" width="100">
                    </div>
                `;
            });
        });
}

function addExhibit() {
    const name = document.getElementById('exhibit-name').value;
    const description = document.getElementById('exhibit-description').value;
    const imageUrl = document.getElementById('exhibit-image-url').value;

    fetch('http://localhost:5000/exhibits', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, description, image_url: imageUrl }),
    })
    .then(response => response.json())
    .then(() => {
        fetchExhibits();
        document.getElementById('exhibit-name').value = '';
        document.getElementById('exhibit-description').value = '';
        document.getElementById('exhibit-image-url').value = '';
    });
}
