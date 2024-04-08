const commentsArray = [
    {name:"Victor Pinto", timestamp: "11-02-2023", comment: "This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains."},
    {name: "Christina Cabrera", timestamp: "10/28/2023", comment: "I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day."},
    {name: "Isaac Tadesse", timestamp: "10/20/2023", comment: "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough."}
];

 // function to modify .createElement to add className.
 function createElementWithClass(tagName, className){
    const element = document.createElement(tagName);
    element.className = className;
    return element;
}

function displayComment(comment){
    const commentsSection = document.querySelector('.comments');

    const containerElem = createElementWithClass('div', 'comments__container');
    const avatarElem = createElementWithClass('div', 'comments__avatar');
    const subcontainerElem = createElementWithClass('div', 'comments__subcontainer');
    const nameTimeContainerElem = createElementWithClass('div', 'comments__name-time-container');
    const nameElem = createElementWithClass('h3', 'comments__name');
    const timeStampElem = createElementWithClass('p', 'comments__timestamp');
    const commentContainerElem = createElementWithClass('div', 'comments__comment-container');
    const commentElem = createElementWithClass('p', 'comments__text');
    const dividerElem = createElementWithClass('hr', 'comments__divider');

    //assign the appropriate values from the form to the comment elements.
    nameElem.innerText = comment.name;
    timeStampElem.innerText = comment.timestamp;
    commentElem.innerText = comment.comment;

    //append the comment to its container
    commentContainerElem.appendChild(commentElem);
    //append the name and date to its container
    nameTimeContainerElem.append(nameElem, timeStampElem);
    //append both items to its container 
    subcontainerElem.append(nameTimeContainerElem, commentContainerElem);
    //append the subcontainer and avatar to the main container
    containerElem.append(avatarElem, subcontainerElem);
    //append comment to the section
    commentsSection.appendChild(containerElem);
    
    //create a divider 
    commentsSection.appendChild(dividerElem);
}

commentsArray.forEach(comment => displayComment(comment));

//function to create a comment object from the form
function createComment(){
    
    const nameElem = document.getElementById('name');
    const dateElem = new Date(); 
    const formatDate = dateElem.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
    const commentElem = document.getElementById('comment');
      
    const newComment = {
        name: nameElem.value,
        timestamp: formatDate,
        comment: commentElem.value
    };

    commentsArray.unshift(newComment);

    nameElem.classList.remove('comments__invalid');
    commentElem.classList.remove('comments__invalid');

}

//function to clear the comments section
function clearSection(){
    const commentSection = document.querySelector('.comments');
    while (commentSection.firstChild){
        commentSection.removeChild(commentSection.firstChild);
    }
}

//function to rerender comments into the section
function renderComments(){
    commentsArray.forEach(comment => displayComment(comment));
}

//function to reset the form field and submitting
function resetFormField(){
    document.querySelector('.add-comments__form').reset();
}

function checkValidity(){
    const nameField = document.getElementById('name');
    const commentField = document.getElementById('comment');
    let validator = true;

    if (!nameField.value){
        nameField.classList.add('comments__invalid');
        validator = false;
    }

    if (!commentField.value){
        commentField.classList.add('comments__invalid');
        validator = false;
    }

    return validator;
}

//on submit, run a function that creates and adds comment to the section
const submitButton = document.querySelector('.add-comments__form');

submitButton.addEventListener('submit', (event) => {
   event.preventDefault();
   if (!checkValidity()){
    return false;
   }
   
   else{
    createComment();
    clearSection();
    renderComments();
    resetFormField();
   }
   });