// ---------------- un solo archivo -------------------------------
const fileTag = document.querySelector('#myfile') || 1;
const fileNameElem = document.querySelector('#filename');

if (fileTag !== 1) {
    uploadButton.addEventListener('click', () => {
        fileTag.click();
    });
    
    fileTag.addEventListener('change',()=>{
        fileNameElem.innerText = fileTag.files[0].name;
    });
    
    subirFetch.addEventListener('click', ()=> {
        let config = {
            method: 'post',
            body: fileTag.files[0]
        };
    
        fetch('/api/single-file', config)
            .then(result => result.blob())
            .then(data => imagen.src = URL.createObjectURL(data))
            .catch(error =>  console.error(error))
    });
}


//----------------------------- multiples archivos ------------------------------

if (fileTag === 1) {
    uploadsButton.addEventListener('click', ()=>{
        myfiles.click();
    });
    
    myfiles.addEventListener('change', ()=>{
       let totalRchivos = myfiles.files.length;
       for (let i = 0; i < totalRchivos; i++) {
            filesNames.innerHTML += `<br>${myfiles.files[i].name}`; 
       }
    });

    subirMFetchs.addEventListener('click', ()=> {
        for (const archivo of myfiles.files) {
            let config = {
                method: 'post',
                body: archivo
            };
        
            fetch('/api/single-file', config)
                .then(result => result.blob())
                .then(data => {
                    resultado.innerHTML += `
                        <div class="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4">
                            <img src="${URL.createObjectURL(data)}" class="img-fluid">
                        </div>
                    `;
                })
                .catch(error =>  console.error(error))
        }
    });
}

