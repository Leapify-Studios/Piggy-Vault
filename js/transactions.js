document.addEventListener("DOMContentLoaded", function () {
    const APIKEY = "65be7c529fa2e46ad03585b2";

    document.getElementById("transaction-form").addEventListener("submit", function (e) {
        e.preventDefault();

        let userId = localStorage.getItem("userId");
        let type = document.getElementById("type").value;
        let category = document.getElementById("category").value;
        let amount = document.getElementById("amount").value;
        let date = document.getElementById("date").value;

        postExpenses(userId, type, category, amount, date);
    });

    /* Post expenses to child collection of logged in user (userinfo/transactions)*/
    function postExpenses(userId, type, category, amount, date) {
        const apiUrl = `https://piggyvault-b0eb.restdb.io/rest/userinfo/${userId}/transactions`;

        const transactionsData = {
            type: type,
            category: category,
            amount: amount,
            date: date,
        };

        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-apikey': APIKEY
            },
            body: JSON.stringify(transactionsData)
        })
        .then(response => response.json())
        .then(data => {

            console.log('Transaction added:', data);

            /* bootstrap green alert*/
            document.getElementById("expense-msg").innerHTML = '<div class="alert alert-success" role="alert">Expense added successfully!</div>';
            document.getElementById("amount").value = "";
            document.getElementById("date").value = "";
        })
        .catch(error => {
            console.error('Error adding transaction:', error);
            document.getElementById("expense-msg").innerHTML = '<div class="alert alert-danger" role="alert">Error adding expense. Please try again.</div>';
        });
    }
});