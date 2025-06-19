const myLibrary = [
    new Book("One piece", "Oda", true, 1100),
    new Book("One piece", "Oda", true, 1100),
    new Book("One piece", "Oda", true, 1100)
];
const main = document.querySelector("main");
const addBtn = document.querySelector(".addBkContainer > button");
const addBtnContainer = document.querySelector(".addBkContainer");
const exitBtn = document.querySelector(".exitBtn");
const submitBtn = document.querySelector(".submitBtn");

const title = document.querySelector("#title");
const author = document.querySelector("#author");
const numPages = document.querySelector("#numPages");
const isRead = document.querySelector("#isRead");

function Book(title, author, isRead, numPages){
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.isRead = isRead;
    this.numPages = numPages;
}

function addBookToLibrary(title, author, isRead, numPages){
    myLibrary.push(new Book(title, author, isRead, numPages));
}

function makeBkContainer(book){
    let bkContainer = document.createElement("div");
    bkContainer.classList.add("bkContainer");

    let topRow = document.createElement("div");
    let title = document.createElement("div");
    let deleteIcon = document.createElement("button");

    title.classList.add("title");
    title.textContent = book["title"];
    deleteIcon.classList.add("deleteCardBtn");
    deleteIcon.textContent = "X";

    topRow.appendChild(title);
    topRow.appendChild(deleteIcon);

    let author = document.createElement("div");
    author.classList.add("author");
    author.innerHTML = `<img src="img/authorIcon.svg">${book["author"]}`;

    let numPages= document.createElement("div");
    numPages.classList.add("numPages")
    numPages.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <title>book-open-page-variant</title>
                    <path d="M19 2L14 6.5V17.5L19 13V2M6.5 5C4.55 5 2.45 5.4 1 6.5V21.16C1 21.41 1.25 21.66 1.5 21.66C1.6 21.66 1.65 21.59 1.75 21.59C3.1 20.94 5.05 20.5 
                    6.5 20.5C8.45 20.5 10.55 20.9 12 22C13.35 21.15 15.8 20.5 17.5 20.5C19.15 20.5 20.85 20.81 22.25 21.56C22.35 21.61 22.4 21.59 22.5 21.59C22.75 21.59 
                    23 21.34 23 21.09V6.5C22.4 6.05 21.75 5.75 21 5.5V19C19.9 18.65 18.7 18.5 17.5 18.5C15.8 18.5 13.35 19.15 12 20V6.5C10.55 5.4 8.45 5 6.5 5Z" fill="white"/>
                </svg>${book["numPages"]}`;

    let bottomRow = document.createElement("div");
    let readSign = document.createElement("button");
    let readDiv = document.createElement("div");

    readSign.classList.add("readSign");
    readDiv.classList.add("read");

    if (book["isRead"])
        readSign.textContent = "✓";
    else
        readSign.textContent = "X";

    readSign.addEventListener("click", () => {
        if (readSign.textContent === "✓")
            readSign.textContent = "X";
        else
            readSign.textContent = "✓";
    })

    readDiv.textContent = "Read";

    bottomRow.appendChild(readSign);
    bottomRow.appendChild(readDiv);

    bkContainer.appendChild(topRow);
    bkContainer.appendChild(author);
    bkContainer.appendChild(numPages);
    bkContainer.appendChild(bottomRow);


    deleteIcon.addEventListener("click", () => {
        main.removeChild(bkContainer);
        myLibrary.splice(myLibrary.indexOf(book), 1);
    });

    return bkContainer;
}

function displayArray(){
    for (book of myLibrary){
        main.insertBefore(makeBkContainer(book), addBtnContainer);
    }
}

addBtn.addEventListener("click", () => {
    const form = document.querySelector("form");
    form.classList.remove("invis");
    main.classList.add("blur");
});

exitBtn.addEventListener("click", () => {
    const form = document.querySelector("form");
    form.classList.add("invis");
    main.classList.remove("blur");
    
    title.value = "";
    author.value = "";
    numPages.value = "";
    isRead.checked = false;

    title.classList.remove("invalid");
    author.classList.remove("invalid");
    numPages.classList.remove("invalid");
});

submitBtn.addEventListener("click", () => {
    if (!(title.value.trim() === "" || author.value.trim() === "" || isNaN(numPages.value) || numPages.value.trim() === "")) {
        let newBk = new Book(title.value, author.value, isRead.checked, numPages.value);

        title.value = "";
        author.value = "";
        numPages.value = "";
        isRead.checked = false;

        main.insertBefore(makeBkContainer(newBk), addBtnContainer);
        myLibrary.push(newBk);

        const form = document.querySelector("form");
        form.classList.add("invis");

        main.classList.remove("blur");
        title.classList.remove("invalid");
        author.classList.remove("invalid");
        numPages.classList.remove("invalid");
    }
    else{
        if (title.value.trim() === "")
            title.classList.add("invalid");
        if (author.value.trim() === "")
            author.classList.add("invalid");
        if (isNaN(numPages.value) || numPages.value.trim() === "")
            numPages.classList.add("invalid");
    }

})

displayArray();