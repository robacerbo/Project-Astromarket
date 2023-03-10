
fetch("./DATABASE.json")
.then(response => response.json())
.then(annunci => {
    console.log(annunci)
    
    const totAnnunci = document.querySelector('#totAnnunci');
    const ratingIscritti = document.querySelector('#ratingSeller');
    const ratingAnnunci = document.querySelector('#ratingAnnunci');
    
    
    const ratingSeller = annunci.map(el => el.rating_seller).reduce((t, rating) => {
        return t += rating / annunci.length
    }, 0)
    
    const ratingProdotti = annunci.map(el => el.rating_product).reduce((t, rating) => {
        return t += rating / annunci.length
    }, 0)
    
    
    totAnnunci.textContent = annunci.length
    ratingIscritti.textContent = Math.round(ratingSeller)
    ratingAnnunci.textContent = Math.round(ratingProdotti)
    
    
    let swiper = new Swiper(".mySwiper", {
        slidesPerView: 3,
        centeredSlides: true,
        spaceBetween: 30,
        grabCursor: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });
    
    
    // PSEUDO CODE
    // Parto dall'array degli annunci
    // mi serve un posto dove salvare in memoria le categorie presenti 
    let finalCategories = [];
    // ciclo su ogni elemento dei miei annunci 
    for (let i = 0; i < annunci.length; i++) {
        const annuncio = annunci[i];
        // accedi alla chiave category
        // effettuo un check 
        // se valore categoria non é incluso nel posto dove salveró le mie categorie
        if (!finalCategories.includes(annuncio.category)) {
            // aggiungi il valore category 
            finalCategories.push(annuncio.category)
        }
    }
    
    // ritornare il posto dove sto accumulando le categorie 
    // console.log(finalCategories)
    
    
    const swiperWrapper = document.querySelector(".swiper-wrapper");    
    // per ogni elemento dell array finalCategories
    finalCategories.forEach(element => {
        // creamo un nodo sul dom 
        // creamo un nodo di tipo div 
        let div = document.createElement('div')
        // dopo aver creato assegniamo la class swiper slide
        div.classList.add('swiper-slide')
        // e dopo ignettiamo l'html della card 
        div.innerHTML = `
        <div class="card p-3 card-category" style="width: 18rem; height: 18rem;">
        <div class="card-body">
        <p class="card-title mt-3 fs-main bg-main h2">${element}</p>
        <p class="card-text mt-3 tx-s">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        <button class="btn-category d-block ms-auto">
        <i class="bi bi-chevron-right text-white"></i>
        </button>
        </div>
        </div>
        `
        // appendiamo tutto in swiper wrapper 
        swiperWrapper.appendChild(div)
    })
    
    
    const lastUploaded = document.querySelector('#lastUploaded');

    
    // nome annucio, categora, stato, prezzo, data
    
    const contentCard = annunci.map(annuncio => {
        return [annuncio.name_product, annuncio.category, annuncio.usage, annuncio.price, new Date(annuncio.pubblished), annuncio.img_url];
    });
    
    const lastUpdatedObject = contentCard.sort((a, b) => b[4] - a[4]).slice(0,4)

    console.log(lastUpdatedObject)
    
    
    lastUpdatedObject.forEach(el => {
        let div = document.createElement('div')
        div.classList.add('col-12', 'col-md-3', 'mb-3')
        div.innerHTML = `
        <div class="card border-0 card-category p-2 h-100 d-flex flex-column justify-content-between" style="width: 18rem;">
            <div>
                <img src="${el[5][0]}" class="card-img-top">
                <h5 class="card-title fs-main bg-main fs-3 mt-4">${el[0]}</h5>
            </div>
            <div>
                <div class="card-body">
                    <div class="mt-3">
                        <div class="d-flex justify-content-between">
                            <p class="card-text text-white mb-0 fs-main">Categoria</p><span class="tx-s fst-italic fs-main ">${el[1]}</span> 
                        </div>
                        <div class="d-flex justify-content-between">
                            <p class="card-text text-white mb-0 fs-main">Stato</p><span class="tx-s fst-italic fs-main">${el[2] == false ? "Nuovo" : "Usato"}</span>
                        </div>
                        <div class="d-flex justify-content-between">
                            <p class="card-text text-white mb-0 fs-main">Prezzo</p><span class="tx-s fst-italic fs-main">${el[3]}€</span>   
                        </div> 
                        <div class="d-flex justify-content-between">
                            <p class="card-text text-white mb-0 fs-main">Published</p><span class="tx-s fst-italic fs-main">${el[4].toLocaleDateString('it-IT', { year:"numeric", month:"short", day:"numeric"})}</span>   
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

        lastUploaded.appendChild(div)
    })
    
    
})
