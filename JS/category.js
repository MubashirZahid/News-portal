fetch('https://openapi.programming-hero.com/api/news/categories')
.then(res => res.json())
.then(data => categoryAdd(data.data.news_category))
.catch(error => console.log(error));

const categoryAdd = (category) =>{

    const categoryContainer  = document.getElementById('category-add');
    

    category.forEach(c =>{
        let categoryDiv = document.createElement('div');
        categoryDiv.innerHTML = `
        <a href="#" class="lighten-2-hover" onclick="loadNews('${c.category_id}')"> ${c.category_name} </a>
        `
        categoryContainer.appendChild(categoryDiv);
        
    });
        
    
}

const loadNews = (id) =>{
    fetch(`https://openapi.programming-hero.com/api/news/category/${id}`)
    .then(res => res.json())
    .then(data => cardAdd(data.data))
    .catch(error => console.log(error));

    spinnerAdd(true);
    


    const cardContainer  = document.getElementById('card-add');
    const itemContainer = document.getElementById('no-of-item');

    itemContainer.innerHTML = ``;
    cardContainer.innerHTML = ``;
    
    const cardAdd = (data) =>{

        let itemDiv = document.createElement('div');
        itemDiv.innerHTML = `
            <p class="fs-2 text-center fw-bold bg-light mb-5"> ${data.length == 0 ? "NO " : data.length} NEWS HAVE BEEN FOUND </p>
        ` 
        itemContainer.appendChild(itemDiv);

        
        console.log(data);
        data.forEach(c =>{


            let cardDiv = document.createElement('div');
            cardDiv.innerHTML = `
                <div class="card mb-3">
                    <img class="card-img-top img-fluid" style ="height: 400px" src="${c.image_url}" alt="Card image cap">
                    <div class="card-body">
                        <h5 class="card-title">${c.title}</h5>
                        <p class="card-text text-truncate">${c.details}</p>
                        <div class="d-flex justify-content-between">
                            <div class="d-inline">
                                <img class ="img-fluid rounded-circle border border-secondary" style ="height:40px" src="${c.author.img}" >
                                <p class="card-text d-inline"><small class="text-muted">${c.author.name ?  c.author.name : "No Data Found"}</small></p>
                            </div>
                            <i class="fa-solid fa-eye">${c.total_view ? c.total_view : "No View"}</i>
                            <a href ="#exampleModal" onclick="addModal('${c.title}' , '${c.author.name}' , '${c.image_url}')" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fa-solid fa-arrow-right"></i></a>
                        </div>
                    </div>
                </div>
            `
            cardContainer.appendChild(cardDiv);
            
        });

        data.sort((a,b)=> b.total_view - a.total_view);
        // console.log(data);

        document.getElementById("sort-view").addEventListener('click', function(){
            data.sort((a,b)=> b.total_view - a.total_view);

            cardContainer.innerHTML = ``;

            data.forEach(c =>{


                let cardDiv = document.createElement('div');
                cardDiv.innerHTML = `
                    <div class="card mb-3">
                        <img class="card-img-top img-fluid" style ="height: 400px" src="${c.image_url}" alt="Card image cap">
                        <div class="card-body">
                            <h5 class="card-title">${c.title}</h5>
                            <p class="card-text text-truncate">${c.details}</p>
                            <div class="d-flex justify-content-between">
                                <div class="d-inline">
                                    <img class ="img-fluid rounded-circle border border-secondary" style ="height:40px" src="${c.author.img}" >
                                    <p class="card-text d-inline"><small class="text-muted">${c.author.name ?  c.author.name : "No Data Found"}</small></p>
                                </div>
                                <i class="fa-solid fa-eye"> ${c.total_view ? c.total_view : "No View"}</i>
                                <a href ="#exampleModal" onclick="addModal('${c.title}' , '${c.author.name}' , '${c.image_url}')" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fa-solid fa-arrow-right"></i></a>
                            </div>
                        </div>
                    </div>
                `
                cardContainer.appendChild(cardDiv);
                
            });

        })

        spinnerAdd(false);
       
    }  
    
}

const spinnerAdd =(isLoading)=>{
    let loaderSection = document.getElementById("loader");
    if(isLoading){
        loaderSection.classList.remove('d-none')
    }
    else{
        loaderSection.classList.add('d-none');
    }
}

const addModal = (data1,data2,data3) =>{

    console.log(data2);

    let modalContainer = document.getElementById("modal-show");
    modalContainer.innerHTML = ``;

    let modalDiv = document.createElement('div');
    modalDiv.innerHTML = `
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">${data1}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
            <img class="img-fluid" style ="height: 400px; width:100%" src="${data3}">
            <p class="mt-3"> Reported By: ${data2 ? data2 : "No name Found"} </p>
            </div>
            <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            
        </div>
    `
    modalContainer.appendChild(modalDiv);
}


