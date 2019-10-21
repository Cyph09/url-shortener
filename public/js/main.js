// Variables
const shortenBtn = document.getElementById("shorten-btn");
const listItem = document.querySelector(".list-group-item");
const longUrlInput = document.getElementById("long-url-input");
const shortUrlCard = document.querySelector(".card");
const shortLinkDisplay = document.querySelector(".short-link");

shortUrlCard.style.visibility = "hidden";

// Event listeners
shortenBtn.addEventListener("click", e => {
  e.preventDefault();
  shortenLongUrl(longUrlInput.value);
  longUrlInput.value = "";
  longUrlInput.focus();
});

shortLinkDisplay.addEventListener("click", e => {
  if (e.target.classList.contains("btn-copy")) {
    const shortLink = document.querySelector(".list-group-item").childNodes[1]
      .textContent;

    navigator.clipboard.writeText(shortLink).then(
      () => {
        const btnCopy = document.querySelector(".btn-copy");

        // Modify copy button to notify user link was copied to clipboard
        btnCopy.classList.remove("btn-light");
        btnCopy.classList.add("btn-success");
        btnCopy.textContent = "Copied!";

        // Change back the copy button after 1 sec.
        setTimeout(() => {
          btnCopy.classList.remove("btn-success");
          btnCopy.classList.add("btn-light");
          btnCopy.textContent = "Copy";
        }, 1000);
      },
      () => console.log("Copy failed!")
    );
  }
});

// Post long url to be shortened
const shortenLongUrl = async longUrl => {
  const url = "/api/shorturl/shorten";
  if (longUrl) {
    try {
      const postUrl = await axios.post(url, { longUrl });

      const shortUrl = postUrl.data.urlInfo.shortUrl;
      const resId = postUrl.data.urlInfo.urlCode;
      const listItem = `<li id=${resId} class='list-group-item d-flex justify-content-between align-items-center bg-light'>
      <a href=${shortUrl} target='_blank'>${shortUrl}</a>
      <button type="button" class="btn btn-light btn-copy">Copy</button>
      </li>`;

      shortLinkDisplay.insertAdjacentHTML("afterbegin", listItem);

      shortUrlCard.style.visibility = "visible";
    } catch (error) {
      console.log(error.message);
      // Notify user: Try again something went wrong
    }
  } else {
    console.log("Pass in long url.");
    // Notify user to pass in valid url
  }
};

