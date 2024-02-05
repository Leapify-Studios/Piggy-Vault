document.addEventListener("DOMContentLoaded", function () {
    const APIKEY = "65be7c529fa2e46ad03585b2";

    document.getElementById("transaction-form").addEventListener("submit", function (e) {
        e.preventDefault();

        let userId = localStorage.getItem("userId");
        let category = document.getElementById("category").value;
        let amount = document.getElementById("amount").value;
        let date = document.getElementById("date").value;
        let type = document.getElementById("type").value;

        postExpenses(userId, category, amount, date, type);
    });

    /* Post expenses to child collection of logged in user (userinfo/expenses)*/
    function postExpenses(userId, category, amount, date) {
        const apiUrl = `https://piggyvault-b0eb.restdb.io/rest/userinfo/${userId}/expenses`;

        const expenseData = {
            category: category,
            amount: amount,
            date: date,
            type: type
        };

        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-apikey': APIKEY
            },
            body: JSON.stringify(expenseData)
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