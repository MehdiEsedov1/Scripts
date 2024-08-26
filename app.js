const input = document.getElementById("input");
const ul = document.getElementById("ul");
const form = document.getElementById("form");

document.addEventListener("DOMContentLoaded", function () {
  chrome.storage.local.get({ locations: [] }, function (data) {
    const locations = data.locations || [];

    locations.forEach((item) => {
      const li = document.createElement("li");
      li.innerHTML = `<p>${item}</p>`;

      let i = document.createElement("i");
      i.setAttribute("class", "fa fa-remove");
      i.addEventListener("click", handleClick);

      li.appendChild(i);
      ul.appendChild(li);
    });

    form.addEventListener("submit", handleSubmit);
  });
});

window.addEventListener("load", function () {
  const currentUrl = new URL(window.location.href).hostname;

  chrome.storage.local.get({ locations: [] }, function (data) {
    const locations = data.locations || [];

    locations.forEach((item) => {
      if (currentUrl.includes(item)) {
        window.location.href = "https://www.mehdiasadov.com/";
      }
    });
  });
});

function handleSubmit(e) {
  let inputValue = input.value;

  const url = new URL(inputValue);
  const domain = url.hostname;

  try {
    chrome.storage.local.get({ locations: [] }, function (data) {
      const locations = data.locations || [];
      locations.forEach((item) => {
        if (item == domain) {
          throw new Error("There is already a url like this.");
        }
      });

      locations.push(domain);

      chrome.storage.local.set({ locations: locations }, function () {
        console.log("Links added to storage.");
      });

      const li = document.createElement("li");
      li.innerHTML = `<p>${domain}</p>`;

      let i = document.createElement("i");
      i.setAttribute("class", "fa fa-remove");
      i.addEventListener("click", handleClick);

      li.appendChild(i);
      ul.appendChild(li);
    });
  } catch (error) {
    console.error(error);
  }

  input.value = "";
  e.preventDefault();
}

function handleClick(e) {
  const url = e.target.parentElement.firstChild.textContent.trim();

  chrome.storage.local.get({ locations: [] }, function (data) {
    let locations = data.locations || [];

    locations.forEach((item, index) => {
      if (url === item) {
        locations.splice(index, 1);
      }
    });

    chrome.storage.local.set({ locations: locations }, function () {
      console.log("Links added to storage.");
    });
  });

  location.reload();
}

chrome.storage.local.get(null, function (items) {
  console.log(items);
});
