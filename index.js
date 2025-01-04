let searchInput = document.getElementById("searchInput");
let searchResults = document.getElementById("searchResults");
let spinner = document.getElementById("spinner");
let options = {
    method: "GET"
};

function createAndAppendResult(result) {
    let resultContainer = document.createElement("div");
    resultContainer.classList.add("result-item");
    searchResults.appendChild(resultContainer);

    let resultTitle = document.createElement("a");
    resultTitle.href = result.link;
    resultTitle.target = "_blank";
    resultTitle.textContent = result.title;
    resultTitle.classList.add("result-title");
    resultContainer.appendChild(resultTitle);

    let br1 = document.createElement("br");
    resultContainer.appendChild(br1);

    let resultLink = document.createElement("a");
    resultLink.href = result.link;
    resultLink.target = "_blank";
    resultLink.textContent = result.link;
    resultLink.classList.add("result-url");
    resultContainer.appendChild(resultLink);

    let br2 = document.createElement("br");
    resultContainer.appendChild(br2);

    let resultDescription = document.createElement("p");
    resultDescription.textContent = result.description;
    resultDescription.classList.add("link-description");
    resultContainer.appendChild(resultDescription);


}

function searchWiki(event) {
    if (event.key === "Enter") {
        searchResults.textContent = "";
        spinner.classList.remove("d-none");
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInput.value;
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(JsonData) {
                let {
                    search_results
                } = JsonData;
                spinner.classList.add("d-none");
                for (let result of search_results) {
                    createAndAppendResult(result);
                }
            });
    }
}

searchInput.addEventListener("keydown", searchWiki);