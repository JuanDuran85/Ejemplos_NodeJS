getImg.addEventListener('click',()=>{
    fetch('/api/sendfile').then(res => res.blob()).then(data =>{
        let imagen = document.createElement('img');
        imagen.src = URL.createObjectURL(data);
        resultado.appendChild(imagen);
    }).catch(error => console.error(error));
})