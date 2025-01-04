document.getElementById('myForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    const data = JSON.stringify({
        name,email,message
    });
    console.log(data)
    fetch('/book-reservation', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: data
    })
    .then(response => response.json())
    .then(data => {
        alert('Success ', data);
        console.log('Success:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

document.getElementById('comment-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const commentName = document.getElementById('commentName').value;
    const message = document.getElementById('comment').value;

    const data = JSON.stringify({
        name:commentName,message
    });
    console.log(data)
    fetch('/comment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: data
    })
    .then(response => response.json())
    .then(data => {
        alert('Success:', data);
        console.log('Success ', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
