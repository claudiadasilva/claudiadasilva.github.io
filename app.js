/* new app.js */
document.addEventListener('DOMContentLoaded', init, false);
let elem;

async function init() {
    elem = document.querySelector('#joke');
    /* elem = document.getElementById('joke'); */
    getjoke();

    document.querySelector('#jokeBtn').addEventListener('click', getjoke, false);

    /* sw */
    registerServiceWorker();

}

async function getjoke() {
    elem.innerHTML = "<em>Loading joke...</em>";
    let request = await fetch('https://icanhazdadjoke.com/', {
        headers: {
            "Accept": "application/json",
        }
    });
    let result = await request.json();
    /* console.log(result); */
    elem.innerHTML = result.joke;
}

/* Service Worker Code */
async function registerServiceWorker() {
    if ("serviceWorker" in navigator) {
      try {
        const registration = await navigator.serviceWorker.register("/sw.js", {
          scope: "/",
        });
        if (registration.installing) {
          console.log("Service worker installing");
        } else if (registration.waiting) {
          console.log("Service worker installed");
        } else if (registration.active) {
          console.log("Service worker active");
        }
      } catch (error) {
        console.error(`Registration failed with ${error}`);
      }
    }
  };
  
  // …