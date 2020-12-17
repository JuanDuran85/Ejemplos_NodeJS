let conectarAPI = async () => {
    try {
        let resultado = await fetch('http://localhost:3000/api/');
        let datos = await resultado.json();
        datos.data.forEach(element => {
            resultados.innerHTML += `
            <div class="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-12 my-3">
                <div class="card">
                    <img src="${element.imageUrl}" class="card-img-top" alt="${element.id}">
                    <div class="card-body">
                        <h5 class="card-title">${element.name}</h5>
                        <p class="card-text">wholePrice: ${element.wholePrice} | slicePrice: ${element.slicePrice}</p>
                        <a href="#" class="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
            </div>
            `;
        });    
    } catch (error) {
        
    }
};

boton.addEventListener('click', conectarAPI);
