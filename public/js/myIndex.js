const modal1 = document.querySelector(".modal.mody");
const modal2 = document.querySelector(".modal.delt");
const modal3 = document.querySelector(".modal.remv");
const uId = modal1.querySelector("#update-id");
const sPrt = modal2.querySelector("#sel-part");
const pCatg = modal2.querySelector("#part-catg");

const sPrtRmv = modal3.querySelector("#sel-part-rmv");
const pCatgRmv = modal3.querySelector("#part-catg-rmv");

const title = modal1.querySelector(".sub-title");
const Pname = modal1.querySelector("#text");
const category = modal1.querySelector("#category");
const file = modal1.querySelector("input[type='file']");
const image = modal1.querySelector(".my-img");
const color = modal1.querySelector("input[type='color']");
const submit = modal1.querySelector(".submit");
const oldCategory = modal1.querySelector("#old-category");

let update = true;



inputElement = modal1.querySelector("#category");

inputElement.addEventListener('input', function () {
    if (update) {
        document.querySelector(".form-modal").setAttribute("action", "/admin/update-participant?category=" + inputElement.value);
    } else {
        document.querySelector(".form-modal").setAttribute("action", "/admin/add-participant?category=" + inputElement.value);
    }

});


document.querySelectorAll(".update").forEach((btn) => {
    btn.addEventListener("click", (e) => {

        update = true;
        // Get a reference to the parent container and the button
        const container = document.querySelector('.form-modal');
        const oldInput = document.querySelector('#my-img');

        // Create the new input element
        const newInput = document.createElement('input');
        newInput.type = 'file';
        newInput.accept = 'image/*';
        newInput.name = 'image';
        // newInput.value = 'select';
        // newInput.id = 'my-img';
        newInput.onchange = function (event) {
            uploadAvatar(event);
        };
        newInput.hidden = true;
        newInput.required = false;

        container.replaceChild(newInput, oldInput);

        newInput.id = 'my-img';


        // document.querySelector(".form-modal").setAttribute("action", "/admin/update-participant?category=");

        const tId = e.target.closest("tr").querySelector(".prdt-id");
        const tImage = e.target.closest("tr").querySelector(".prdt-image img");
        const tName = e.target.closest("tr").querySelector(".prdt-name");
        const tCategory = e.target.closest("tr").querySelector(".prdt-catg");
        const tColor = e.target.closest("tr").querySelector(".prdt-color .item-color");

        oldCategory.value = tCategory.textContent.trim();
        category.value = tCategory.textContent.trim();
        uId.value = tId.textContent.trim();
        submit.textContent = "Update Participant";
        title.textContent = "Update Participant";
        Pname.value = tName.textContent.trim();
        document.querySelector(".form-modal").setAttribute("action", "/admin/update-participant?category=" + tName.textContent.trim());
        image.src = tImage.src;

        const RGBvalue = getComputedStyle(tColor).backgroundColor;
        const rgb2hex = (rgb) => `#${rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/).slice(1).map(n => parseInt(n, 10).toString(16).padStart(2, '0')).join('')}`;
        const hex = rgb2hex(RGBvalue);

        color.value = hex;

        // const fileInput = document.querySelector('input[type="file"]');

        // // Create a new File object
        // const myFile = new File(tImage.src);

        // // Now let's create a DataTransfer to get a FileList
        // const dataTransfer = new DataTransfer();
        // dataTransfer.items.add(myFile);
        // fileInput.files = dataTransfer.files;

        // // Help Safari out
        // if (fileInput.webkitEntries.length) {
        //     fileInput.dataset.file = `${dataTransfer.files[0].name}`;
        // }

        modal1.classList.add("active-modal");
    });
});

document.querySelectorAll(".delete").forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const tName = e.target.closest("tr").querySelector(".prdt-name");
        const tCatg = e.target.closest("tr").querySelector(".prdt-catg");

        sPrt.value = tName.textContent.trim();
        pCatg.value = tCatg.textContent.trim();


        modal2.classList.add("active-modal");
    });
    // console.log(document.querySelector("#my-img").value);
});

document.querySelectorAll(".remove").forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const tName = e.target.closest("tr").querySelector(".prdt-name");
        const tCatg = e.target.closest("tr").querySelector(".prdt-catg");

        sPrtRmv.value = tName.textContent.trim();
        pCatgRmv.value = tCatg.textContent.trim();


        modal3.classList.add("active-modal");
    });
    // console.log(document.querySelector("#my-img").value);
});

// document.querySelector(".no").addEventListener("click", () => {
//     emptyId();
//     modal1.classList.remove("active-modal");
// });

document.querySelector(".modal-close").addEventListener("click", () => {
    emptyId();
    modal1.classList.remove("active-modal");
});

document.querySelector(".camera").addEventListener("click", () => {
    document.querySelector("#my-img").click();
});

document.querySelector(".add-btn").addEventListener("click", (e) => {

    update = false;

    // Get a reference to the parent container and the button
    const container = document.querySelector('.form-modal');
    const oldInput = document.querySelector('#my-img');

    // Create the new input element
    const newInput = document.createElement('input');
    newInput.type = 'file';
    newInput.accept = 'image/*';
    newInput.name = 'image';
    // newInput.value = 'select';
    // newInput.id = 'my-img';
    newInput.onchange = function (event) {
        uploadAvatar(event);
    };
    newInput.hidden = true;
    newInput.required = false;

    container.replaceChild(newInput, oldInput);

    newInput.id = 'my-img';


    document.querySelector(".form-modal").setAttribute("action", "/admin/add-participant?category=");

    oldCategory.value = "";
    title.textContent = "Add new participant";
    submit.textContent = "Add new participant";
    Pname.value = "";
    category.value = "";
    image.src = "/img/pp.webp"


    modal1.classList.add("active-modal");
});


modal1.addEventListener("click", (e) => {
    if (e.target.classList[0] == "modal") {
        emptyId();
        modal1.classList.remove("active-modal");
    }
})

modal2.addEventListener("click", (e) => {
    if (e.target.classList[0] == "modal") {
        emptyId();
        modal2.classList.remove("active-modal");
    }
})

modal3.addEventListener("click", (e) => {
    if (e.target.classList[0] == "modal") {
        emptyId();
        modal3.classList.remove("active-modal");
    }
})

function uploadAvatar(e) {
    const file = e.target.files[0];

    console.log(document.querySelector("#my-img").value);

    const img = URL.createObjectURL(file);

    image.setAttribute("src", img);

}

function emptyId() {
    sPrt.value = "";
    pCatg.value = "";
    // dId.value = "";
    // dId.value = "";
    uId.value = "";
}