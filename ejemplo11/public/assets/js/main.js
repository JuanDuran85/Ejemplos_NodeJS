const fileTag = document.querySelector('#myfile');
const fileNameElem = document.querySelector('#filename');

document.querySelector('#uploadButton').addEventListener('click', () => {
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