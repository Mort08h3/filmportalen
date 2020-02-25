        const container = document.querySelector(".data-container");
        const template = document.querySelector("template");
        const detalje = document.querySelector("#detalje");
        let produkter;
        let allefilm = [];
        let filter = "alle";

        const id = "1m9ddpu_jXgZ2MrUp_d2JgQTWyonYcKFc9W1rdv1TdKQ";
        const url = "https://spreadsheets.google.com/feeds/list/" + id + "/1/public/values?alt=json"

        console.log("JSONData link:", url);
        document.addEventListener("DOMContentLoaded", getJson);


        async function getJson() {

            const jsonData = await fetch(url);
            produkter = await jsonData.json();
            visRetter();
            addEventListenersToButtons();
        }

        function visRetter() {
            container.innerHTML = "";
            antal = produkter.feed.entry.length;

            produkter.feed.entry.forEach(produkt => {
                if (filter == "alle" || filter == produkt.gsx$genre.$t) {
                    let klon = template.cloneNode(true).content;

                    klon.querySelector("img").src = "img/" + produkt.gsx$cover.$t + "/plakat.jpg";
                    klon.querySelector("img").alt = `Plakat af filmen: ${produkt.gsx$titel.$t};`
                    klon.querySelector("#produkt").addEventListener("click", () => visDetalje(produkt));
                    container.appendChild(klon);
                }
            })
        }



        function addEventListenersToButtons() {
            document.querySelectorAll(".filter").forEach(elm => {
                elm.addEventListener("click", filtrering);
            })
        }


        function filtrering() {
            filter = this.dataset.genre;
            document.querySelector("h1").textContent = this.textContent;
            document.querySelectorAll(".filter").forEach(elm => {
                elm.classList.remove("valgt");
            })
            this.classList.add("valgt")
            visRetter();
            console.log("Filtreres efter Genren;", filter);

        }

        function visDetalje(produkt) {
            const klon = template.cloneNode(true).content;
            detalje.classList.remove("skjul");
            detalje.querySelector(".luk").addEventListener("click", () => detalje.classList.add("skjul"));
            document.getElementById("overskrift").style.display = "none";


            console.log("Viser pop-up for", produkt.gsx$titel.$t)

            document.querySelector("#detalje #popup-film").textContent = produkt.gsx$titel.$t;
            document.querySelector("#detalje #popup-instruktør").textContent = `Instruktør: ${produkt.gsx$instuktør.$t}`
            document.querySelector("#detalje #popup-beskrivelse").textContent = `Plot: ${produkt.gsx$plot.$t}`
            document.querySelector("#detalje #popup-op").textContent = `Udgivelsesår: ${produkt.gsx$år.$t}`
            document.querySelector("#detalje #popup-spilletid").textContent = `Spilletid: ${produkt.gsx$tid.$t}`
            document.querySelector("#detalje #popup-skuespillere").textContent = `Skuespillere: ${produkt.gsx$cast.$t}`
            document.querySelector("#detalje #popup-produktion").textContent = `Produktionsselskab: ${produkt.gsx$prod.$t}`
            document.querySelector("#detalje #popup-rating").textContent =
                `Stjerner: ${produkt.gsx$stjerner.$t};`
            document.querySelector("#detalje img").src = "img/" + produkt.gsx$cover.$t + "/plakat.jpg";
            document.querySelector("#detalje img").alt = `Plakat af filmen: ${produkt.gsx$titel.$t}`

            container.appendChild(klon);

            window.scrollTo(0, 0);
        }

        /* OFF Canvas-menuen til mobil */
        function openNav() {
            document.getElementById("menu").style.width = "250px";
            document.getElementById("wrapper").style.marginLeft = "250px";
            console.log("Der åbnes for Mobil sidebar");
        }

        function closeNav() {
            document.getElementById("menu").style.width = "0";
            document.getElementById("wrapper").style.marginLeft = "0";
            console.log("Mobil sidebar lukkes igen");
        }
