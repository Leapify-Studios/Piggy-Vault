document.addEventListener("DOMContentLoaded", function () {
    updateCoinAmount();
    document.getElementById('gacha-pull-btn').addEventListener('click', handleGachaPull);
});

const APIKEY = "65be7c529fa2e46ad03585b2";

function fetchUserInfo(userId) {
    return fetch(`https://piggyvault-b0eb.restdb.io/rest/userinfo/${userId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "x-apikey": APIKEY
        }
    }).then(response => response.json());
}

function updateCoinAmount() {
    const userId = localStorage.getItem("userId");

    fetchUserInfo(userId)
        .then(userinfo => {
            const coinAmount = userinfo.piggycoins || 0;
            document.querySelector('.piggy_coin_amount').innerHTML = `<div><img src="images/coin_icon.png"> ${coinAmount}</div>`;
        })
        .catch(error => handleFetchError(error, 'Error fetching user information:'));
}

function handleGachaPull() {
    const userId = localStorage.getItem("userId");

    fetchUserInfo(userId)
        .then(userinfo => {
            const coinAmount = userinfo.piggycoins || 0;

            if (coinAmount >= 100) {
                const updatedCoins = coinAmount - 100;

                const putData = {
                    piggycoins: updatedCoins
                };

                const settings = {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "x-apikey": APIKEY,
                        "Cache-Control": "no-cache"
                    },
                    body: JSON.stringify(putData)
                };

                return fetch(`https://piggyvault-b0eb.restdb.io/rest/userinfo/${userId}`, settings)
                    .then(response => response.json())
                    .then(updatedUserinfo => {
                        console.log('Coins deducted:', updatedUserinfo.piggycoins);
                        updateCoinAmount();
                        pullGacha();
                    });
            } else {
                showUnsuccessfulPopup();
            }
        });
}

function showUnsuccessfulPopup() {
    const popup = document.getElementById('popup');
    const unsuccessfulText = document.getElementById('unsuccessful-text');

    // Display the unsuccessful message and hide the successful message
    unsuccessfulText.style.display = 'block';
    document.getElementById('gacha-text').style.display = 'none';
    document.getElementById('pulled-pig-image').style.display = 'none';
    popup.style.display = 'flex';
}

//Images for gacha
const pigImages = [
    'images/pig1.png',
    'images/pig2.png',
];

function pullGacha() { //To pull a random pig and show popup
    const randomIndex = Math.floor(Math.random() * pigImages.length);
    const pulledPig = pigImages[randomIndex];

    const popup = document.getElementById('pull-popup');
    const pigImageElement = document.getElementById('pulled-pig-image');
    pigImageElement.src = pulledPig;
    popup.style.display = 'flex';
}

function closePopup() { //Used in html
    const popup = document.getElementById('pull-popup');
    popup.style.display = 'none';
}