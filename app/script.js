
// API URL
const API_URL = `http://localhost:8000/api/books`;

// this function will be used to fetch all books from API
function getList() {
    // using the fetch to get data
    // converting it to JSON and then using the JSON data
    fetch(API_URL)
    .then(response => response.json())
    .then(data => {
        // creates empty variable for table html
        let html = ``;
        // loop through all books and generate its html
        data.forEach(book => {
            html += `<tr>
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.genre}</td>
                <td>${book.year}</td>
                <td class="text-center">
                    <button onclick="edit('${book._id}');" class="btn btn-sm btn-dark">
                        <i class="fa fa-edit" style="margin-right: 5px;"></i>
                        Edit
                    </button>
                    <button onclick="deleteBook('${book._id}');" class="btn btn-sm btn-dark">
                        <i class="fa fa-trash" style="margin-right: 5px;"></i>
                        Delete
                    </button>
                </td>
            </tr>`
        });

        // set the html on UI
        document.getElementById('tbl-data').innerHTML = html;
    });
}

// this method will be used to create new book
function add() {
    // getting data from input controls
    let title = document.getElementById('txt-title').value;
    let author = document.getElementById('txt-author').value;
    let genre = document.getElementById('txt-genre').value;
    let year = document.getElementById('txt-year').value;

    // validations
    if(!title || !author || !genre || !year) {
        alert(`All fields are required.`);
        return;
    }

    // validations
    if(year.length !== 4) {
        alert(`Please provide a valid year.`);
        return;
    }

    // create object for all data
    let data = {
        title,
        author,
        genre,
        year
    };

    // check if the ID is in URL
    // if ID exists, it means we are updating existing record,
    // otherwise, we are creating new record
    let id = window.location.href.split('id=').pop();

    // ID check
    if(!id || id.length !== 24) {
        // sending API request to create new book
        fetch(API_URL, {
            method: "POST",
            body: JSON.stringify(data), // sending book data as JSON
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => response.json())
        .then(data => {
            // alert success and redirect to list page
            alert("Book saved successfully!");
            window.location.href = "index.html";
        });
    }
    else {
        // sending API request to update an existing book
        fetch(`${API_URL}/${id}`, {
            method: "PUT",
            body: JSON.stringify(data), // sending book data as JSON
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => response.json())
        .then(data => {
            // alert success and redirect to list page
            alert("Book saved successfully!");
            window.location.href = "index.html";
        });
    }
}

// this method will be called when user clicks on Edit button
function edit(id) {
    window.location.href = `new.html?id=${id}`;
}

// this method will be used to fetch a record from DB and display it on the scren
// it will be used for updating a record
function load() {
    let id = window.location.href.split('id=').pop();
    
    if(!id || id.length !== 24) return;
    
    fetch(`${API_URL}/${id}`)
    .then(response => response.json())
    .then(data => {
        document.getElementById('txt-title').value = data.title;
        document.getElementById('txt-author').value = data.author;
        document.getElementById('txt-genre').value = data.genre;
        document.getElementById('txt-year').value = data.year;
    });
}

// this method will be used for deletion purpose
function deleteBook(id) {
    if(confirm(`Are you sure you want to delete it?`)) {
        fetch(`${API_URL}/${id}`, {
            method: "DELETE",
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => response.json())
        .then(data => {
            alert("Book deleted successfully!");
            window.location.reload();
        });
    }
}op