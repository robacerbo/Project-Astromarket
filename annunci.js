fetch("./DATABASE.json")
    .then(response => response.json())
    .then(data => {
        console.log(data)

        // copia dei dati originali 
        const annunci = data;

        const searchElement = document.querySelector('#searchElement');
        searchElement.setAttribute("placeholder", `cerca tra i ${annunci.length} annunci...`)


        searchElement.addEventListener('input', () => {
            showCards(filterByWord(annunci, searchElement.value))
        })


        function filterByWord(array, word) {
            return array.filter(el => {
                return el.name_product.match(new RegExp(word, "gi"))
            })
        }


        const recenti = document.querySelector("#recenti")
        const retro = document.querySelector('#retro')

        recenti.addEventListener('click', () => {
           showCards(sortingByNewest(annunci))
        })

        retro.addEventListener('click', () => {
            showCards(sortingByOldest(annunci))
        })


        function sortingByNewest(array) {
            return array.sort((a,b) => new Date(b.pubblished) - new Date(a.pubblished))
        }       

        function sortingByOldest(array) {
            return array.sort((a,b) => new Date(a.pubblished) - new Date(b.pubblished))
        }      
        
        
        const categorie = Array.from(new Set(annunci.map(el => el.category)))
        const categorieFromCheckWrapper = document.querySelector('#categorieFromCheckWrapper');
        categorie.forEach(el => {
            let formCheck = document.createElement('div')
            formCheck.classList.add('form-check')
            formCheck.innerHTML = `
            <input class="form-check-input" type="radio" name="flexRadioDefault" id="${el}">
            <label class="form-check-label fw-bold text-white fs-5" for="${el}">
              ${el}
            </label>
            `
            categorieFromCheckWrapper.appendChild(formCheck)
        })


        function filterByCategory(array, value) {
            return array.filter(el => el.category == value)
        }
        
        const inputCategory = document.querySelectorAll('.form-check-input')
        inputCategory.forEach(input => {
            input.addEventListener('click', () => {
                showCards(filterByCategory(annunci, input.id))
            })
        })

        function filterByNew(array) {
            return array.filter(el => el.usage == false)
        }

        function filterByUsed(array) {
            return array.filter(el => el.usage !== false)
        }

       





        const annunciWrapper = document.querySelector('#annunciWrapper');

        function showCards(array) {
            annunciWrapper.innerHTML = "";
            array.forEach(element => {

                let div = document.createElement('div')
                div.classList.add('col-12', 'col-md-4', 'mb-3')
                div.innerHTML = `
                
                
                <div class="card border-0 card-category p-2 h-100 d-flex flex-column justify-content-between" style="width: 18rem;">
                    <div>
                    
                    <img src="${element.img_url[0]}" class="card-img-top">
                    
                        ${element.brend_product == "Apple" ? "<img src='./media/apple.png'>" : ""}
                        ${element.brend_product == "Windows" ? "<img src='./media/windows.png'>" : ""}
                        ${element.brend_product == "Canon" ? "<img src='./media/nikon.png'>" : ""}
                        ${element.brend_product == "Playstation" ? "<img src='./media/play.png'>" : ""}
                        ${element.brend_product == "DJI" ? "<img src='./media/apple.png'>" : ""}
                        ${element.brend_product == "Bose" ? "<img src='./media/apple.png'>" : ""}
                        ${element.brend_product == "JBL" ? "<img src='./media/apple.png'>" : ""}
                        ${element.brend_product == "Nintendo" ? "<img src='./media/nintendo.png'>" : ""}
                        ${element.brend_product == "Samsung" ? "<img src='./media/windows.png'>" : ""}
                        ${element.brend_product == "Xbox" ? "<img src='./media/xbox.png'>" : ""}
                        ${element.brend_product == "Nikon" ? "<img src='./media/nikon.png'>" : ""}
                        <h5 class="card-title fs-main bg-main fs-3 mt-0">${element.name_product}</h5>
                    </div>
                    <div>
                        <div class="card-body">
                        <div class="mt-3">
                            <div class="d-flex justify-content-between">
                            <p class="card-text text-white mb-0 fs-main">Categoria</p><span class="tx-s fst-italic fs-main ">${element.category}</span> 
                            </div>
                            <div class="d-flex justify-content-between">
                            <p class="card-text text-white mb-0 fs-main">Stato</p><span class="tx-s fst-italic fs-main">${element.usage == false ? "Nuovo": "Usato"}</span>
                            </div>
                            <div class="d-flex justify-content-between">
                            <p class="card-text text-white mb-0 fs-main">Prezzo</p><span class="tx-s fst-italic fs-main">${element.price}</span>   
                            </div> 
                            <div class="d-flex justify-content-between">
                            <p class="card-text text-white mb-0 fs-main">Published</p><span class="tx-s fst-italic fs-main">${new Intl.DateTimeFormat('it-IT', { year:"numeric", month:"short", day:"numeric"}).format(new Date(element.pubblished))}</span>  
                            </div>              
                        </div>
                        <div class="d-flex justify-content-between align-items-center mt-4">
                            <button class="btn-category">
                            <i class="bi bi-chevron-right text-white"></i>
                            </button>
                            <i class="bi bi-heart-fill text-white fs-3"></i>
                        </div>
                        </div>
                    </div>
                </div>
                `   
                annunciWrapper.appendChild(div)


            });


        }

        showCards(annunci)



    })