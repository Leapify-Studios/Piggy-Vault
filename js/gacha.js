const pigImages = [
    'images/pig1.png',
    'images/pig2.png',
];

function pullGacha() {
    const randomIndex = Math.floor(Math.random() * pigImages.length);
    const pulledPig = pigImages[randomIndex];

    const popup = document.getElementById('pull-popup');
    const pigImageElement = document.getElementById('pulled-pig-image');
    pigImageElement.src = pulledPig;
    popup.style.display = 'flex';
}

function closePopup() {
    const popup = document.getElementById('pull-popup');
    popup.style.display = 'none';
}
