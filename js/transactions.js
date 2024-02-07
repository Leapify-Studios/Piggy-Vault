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
            const formattedDate = transaction.date ? transaction.date.substring(0, 10) : ''; // Date with no time

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
        console.log('Transaction added:', data); // bootstrap success alert
        document.getElementById("expense-msg").innerHTML = '<div class="alert alert-success" role="alert">Expense added successfully!</div>';
        document.getElementById("amount").value = "";
        document.getElementById("date").value = "";

        // Fetch and display transactions after posting
        displayTransactions();
    })
    .catch(error => {
        console.error('Error adding transaction:', error); // Bootstrap unsuccessful alert
        document.getElementById("expense-msg").innerHTML = '<div class="alert alert-danger" role="alert">Error adding expense. Please try again.</div>';
    });
}

document.addEventListener("DOMContentLoaded", function () {
    // Fetch and display income transactions
    displayTransactions("Income", "income-list");

    // Fetch and display expense transactions
    displayTransactions("Expense", "expense-list");

    document.getElementById("transaction-form").addEventListener("submit", function (e) {
        e.preventDefault();

        let userId = localStorage.getItem("userId");
        let type = document.getElementById("type").value;
        let category = document.getElementById("category").value;
        let amount = document.getElementById("amount").value;
        let date = document.getElementById("date").value;

        postExpenses(userId, type, category, amount, date);

        // Fetch and display transactions after posting
        displayTransactions("Income", "income-list");
        displayTransactions("Expense", "expense-list");
        calculateAndDisplaySummary();
    });

    // Initial calculation and display of summary
    calculateAndDisplaySummary();
});

function calculateAndDisplaySummary() {
    let incomeTotal = calculateTotal("income-list");
    let expenseTotal = calculateTotal("expense-list");

    let monthlyIncomeElement = document.getElementById("monthly-income");
    let monthlyExpensesElement = document.getElementById("monthly-expenses");
    let savingsElement = document.getElementById("savings");

    monthlyIncomeElement.textContent = `$${incomeTotal}`;
    monthlyExpensesElement.textContent = `$${expenseTotal}`;
    savingsElement.textContent = `$${incomeTotal - expenseTotal}`;
}

function calculateTotal(tableId) {
    let total = 0;
    let tableRows = document.getElementById(tableId).getElementsByTagName("tbody")[0].getElementsByTagName("tr");

    for (let i = 0; i < tableRows.length; i++) {
        let amountColumn = tableRows[i].getElementsByTagName("td")[1].textContent;
        let amount = parseFloat(amountColumn.replace("$", ""));
        total += isNaN(amount) ? 0 : amount;
    }

    return total.toFixed(2);
}

