document.addEventListener("DOMContentLoaded", function () {
    displayTransactions("Expense", "expense-list");
    displayTransactions("Income", "income-list");

    document.getElementById("transaction-form").addEventListener("submit", function (e) {
        e.preventDefault();

        let userId = localStorage.getItem("userId");
        let type = document.getElementById("type").value;
        let category = document.getElementById("category").value;
        let amount = document.getElementById("amount").value;
        let date = document.getElementById("date").value;

        postExpenses(userId, type, category, amount, date);
    });
});

// For table based on transaction type
function displayTransactions(type, tableId) {
    const APIKEY = "65be7c529fa2e46ad03585b2";
    const userId = localStorage.getItem("userId");

    fetch(`https://piggyvault-b0eb.restdb.io/rest/userinfo/${userId}/transactions?q={"type": "${type}"}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "x-apikey": APIKEY
        }
    })
    .then(response => response.json())
    .then(response => {
        let content = "";

        response.forEach(transaction => {
            const formattedDate = transaction.date ? transaction.date.substring(0, 10) : '';

            content += `<tr id='${transaction._id}'>
                            <td>${formattedDate}</td>
                            <td>${transaction.amount || ''}</td>
                            <td>${transaction.category || ''}</td>
                            <td>${transaction.type || ''}</td>
                        </tr>`;
        });

        document.getElementById(tableId).getElementsByTagName("tbody")[0].innerHTML = content;
        document.getElementById(`total-${type.toLowerCase()}s`).textContent = response.length;
    })
    .catch(error => {
        console.error(`Error fetching ${type.toLowerCase()} transactions:`, error);
    });
}

// Post to restdb
function postExpenses(userId, type, category, amount, date) {
    const APIKEY = "65be7c529fa2e46ad03585b2";
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
        document.getElementById("expense-msg").innerHTML = '<div class="alert alert-success" role="alert">Expense added successfully!</div>';
        document.getElementById("amount").value = "";
        document.getElementById("date").value = "";

        // Fetch and display transactions after posting
        displayTransactions();
    })
    .catch(error => {
        console.error('Error adding transaction:', error);
        document.getElementById("expense-msg").innerHTML = '<div class="alert alert-danger" role="alert">Error adding expense. Please try again.</div>';
    });
}