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
// a function to send the prompt value to the server using fetch
function send() {
    console.log("Sending...")
    // get the images container
    var images_container = document.getElementById("images_container");
    // get the chat container
    var chatInput = document.querySelector("input#chat").checked;
    var prompt = document.getElementById("prompt").value;
    let url = '', raw;
    if (chatInput){
        url = "https://api.openai.com/v1/completions";
        raw = JSON.stringify({
            "prompt": prompt,
            "model": 'text-davinci-003',
            "n": 2,
        });
    }else{
         // get the number value from the input
    var number = document.getElementById("number").value;
    // get the size value from the input 
    var size = document.getElementById("size").value;
  
        url = "https://api.openai.com/v1/images/generations";
        raw = JSON.stringify({
            "prompt": prompt,
            "n": parseInt(number),
            "size": size
        });
    }
    // get the prompt value
     // change the send button text to sending
    document.getElementById("send").innerHTML = "Sending..";
    // disable the send button
    document.getElementById("send").disabled = true;
    // send chat: 
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + api_key);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    let chatLogs = document.getElementById("chatlogs");
    fetch(url, requestOptions)
        .then(response => response.json())
        .then(result => {
            if (chatInput){
                // append inner html to chatlogs 
                chatLogs.innerHTML += `<div class="user">User: ${prompt}</div>`
                chatLogs.innerHTML += `<div class="chatGPT">ChatGPT: ${result.choices[0].text}</div>`
            }else {
            // clear the images div
            chatLogs.innerHTML += `<div class="chatGPT">Dall-E: </div>`;
            // loop through the result data
            for (var i = 0; i < result.data.length; i++) {
                // create a new image
                var img = document.createElement("img");
                // set the image source to the result data url
                img.src = result.data[i].url;
                // append the image to the images div
                chatLogs.appendChild(img);
            }
            }
            document.getElementById("send").innerHTML = "Send";
            document.getElementById("send").disabled = false;
        })
        .catch(error => console.log('error', error));
}
