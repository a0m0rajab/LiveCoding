  // sendChat function to get the text from the chat and show a random answer on the answer div
  function sendChat() {
    // get the question div
    var question = document.getElementById("question");
    // get the answer div
    var answer = document.getElementById("answer");
    // get the chat value
    var chat = document.getElementById("chatPrompt").value;
    // show the chat value on the question 
    question.innerHTML = chat;    
    // send a request to openAI api using the completion endpoint
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + api_key);

    var raw = JSON.stringify({
        "prompt": chat,
        "model": 'text-davinci-003',
        "n": 2,
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    answer.innerHTML = "generating the answer..."

    fetch("https://api.openai.com/v1/completions", requestOptions)
        .then(response => response.json())
        .then(result => {
            answer.innerHTML = result.choices[0].text
        })
        .catch(error => console.log('error', error));

    
               
}
// activate function for the radio buttons
function activate(index) {
    // get the images container
    var images_container = document.getElementById("images_container");
    // get the chat container
    var chat_container = document.getElementById("chat_container");
    // if index is 0
    if (index == 0) {
        // hide the images container
        images_container.style.display = "none";
        // show the chat container
        chat_container.style.display = "block";
    } else {
        // show the images container
        images_container.style.display = "block";
        // hide the chat container
        chat_container.style.display = "none";
    }
}
let YOUR_API_KEY = "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";
// a function to send the prompt value to the server using fetch
function send() {
    console.log("Sent")
    // get the prompt value
    var prompt = document.getElementById("prompt").value;
    // get the number value from the input
    var number = document.getElementById("number").value;
    // get the size value from the input 
    var size = document.getElementById("size").value;
    // change the send button text to sending
    document.getElementById("send").innerHTML = "Sending";
    // disable the send button
    document.getElementById("send").disabled = true;
    // send the prompt value to the server using fetch
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + YOUR_API_KEY);

    var raw = JSON.stringify({
        "prompt": prompt,
        "n": parseInt(number),
        "size": size
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("https://api.openai.com/v1/images/generations", requestOptions)
        .then(response => response.json())
        .then(result => {
            // clear the images div
            document.getElementById("images").innerHTML = "";
            // loop through the result data
            for (var i = 0; i < result.data.length; i++) {
                // create a new image
                var img = document.createElement("img");
                // set the image source to the result data url
                img.src = result.data[i].url;
                // append the image to the images div
                document.getElementById("images").appendChild(img);
            }
            // change send text to send
            document.getElementById("send").innerHTML = "Send";
            document.getElementById("send").disabled = false;

        })
        .catch(error => console.log('error', error));
}
