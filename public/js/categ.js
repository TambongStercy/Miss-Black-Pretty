const modal1 = document.querySelector(".modal.mody");
const modal2 = document.querySelector(".modal.delt");
const uId = modal1.querySelector("#update-id");
// const dId = modal2.querySelector("#delete-id");
const title = modal1.querySelector(".sub-title");
const Pname = modal1.querySelector("#text");
const file = modal1.querySelector("input[type='file']");
const image = modal1.querySelector(".my-img");
const color = modal1.querySelector("input[type='color']");
const submit = modal1.querySelector(".submit");


let update = true;




inputElement = modal1.querySelector("#text");

inputElement.addEventListener('input', function () {
    if (update) {
        document.querySelector(".form-modal").setAttribute("action", "/admin/update-category?category=" + inputElement.value);
    } else {
        document.querySelector(".form-modal").setAttribute("action", "/admin/create-category?category=" + inputElement.value);
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


        // document.querySelector(".form-modal").setAttribute("action", "/admin/update-category?category=");

        const tId = e.target.closest("tr").querySelector(".prdt-id");
        const tImage = e.target.closest("tr").querySelector(".prdt-image img");
        const tName = e.target.closest("tr").querySelector(".prdt-name");
        const tColor = e.target.closest("tr").querySelector(".prdt-color .item-color");

        uId.value = tId.textContent.trim();
        title.textContent = "Update Category";
        submit.textContent = "Update Category";
        Pname.value = tName.textContent.trim();
        document.querySelector(".form-modal").setAttribute("action", "/admin/update-category?category=" + tName.textContent.trim());
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
})



document.querySelector(".no").addEventListener("click", () => {
    emptyId();
    modal1.classList.remove("active-modal");
});

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
    newInput.required = true;

    container.replaceChild(newInput, oldInput);

    newInput.id = 'my-img';

    document.querySelector(".form-modal").setAttribute("action", "/admin/create-category?category=");

    title.textContent = "Create category";
    submit.textContent = "Create Category";
    Pname.value = "";

    image.src = "/img/pps.jpg"



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


function uploadAvatar(e) {
    const file = e.target.files[0];

    console.log(document.querySelector("#my-img").value);

    const img = URL.createObjectURL(file);

    image.setAttribute("src", img);

}

function emptyId() {
    // dId.value = "";
    uId.value = "";
}