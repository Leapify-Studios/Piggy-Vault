document.addEventListener("DOMContentLoaded", function () {
    const APIKEY = "65be7c529fa2e46ad03585b2";

    document.getElementById("expense-form").addEventListener("submit", function (e) {
        e.preventDefault();

        let userId = localStorage.getItem("userId");
        let category = document.getElementById("category").value;
        let amount = document.getElementById("amount").value;
        let date = document.getElementById("date").value;

        postExpenses(userId, category, amount, date);
    });

    /* Post expenses to child collection of logged in user (userinfo/expenses)*/
    function postExpenses(userId, category, amount, date) {
        const apiUrl = `https://piggyvault-b0eb.restdb.io/rest/userinfo/${userId}/expenses`;

        const expenseData = {
            category: category,
            amount: amount,
            date: date
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
            console.log('Expense posted:', data);
        })
        .catch(error => {
            console.error('Error posting expense:', error);
        });
    }
});
