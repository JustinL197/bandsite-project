import { BandSiteApi, apiKey } from "./band-site-api.js";

const bandSiteApi = new BandSiteApi(apiKey);

 // function to modify .createElement to add className.
 function createElementWithClass(tagName, className){
    const element = document.createElement(tagName);
    element.className = className;
    return element;
}

//function to dynamically display comments
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

//function to create a comment object from the form
function createCommentObject(){
    
    const nameElem = document.getElementById('name');
    const dateElem = new Date(); 
    // const formatDate = dateElem.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
    const commentElem = document.getElementById('comment');
      
    const newComment = {
        name: nameElem.value,
        // timestamp: formatDate,
        comment: commentElem.value
    };

    nameElem.classList.remove('comments__invalid');
    commentElem.classList.remove('comments__invalid');

    return newComment;
}

//function to clear the comments section
function clearSection(){
    const commentSection = document.querySelector('.comments');
    while (commentSection.firstChild){
        commentSection.removeChild(commentSection.firstChild);
    }
}

//function to reset the form field and submitting
function resetFormField(){
    document.querySelector('.add-comments__form').reset();
}

function checkValidity(){
    const nameField = document.getElementById('name');
    const commentField = document.getElementById('comment');
    let validator = true;

    if (!nameField.value.trim()){
        nameField.classList.add('comments__invalid');
        validator = false;
    }

    if (!commentField.value.trim()){
        commentField.classList.add('comments__invalid');
        validator = false;
    }

    return validator;
}

//function to retrieve comments from backend and display it
async function retrieveAndDisplayComments(){
    try{
       const comments = await bandSiteApi.getComments();
       clearSection();
       comments.forEach(comment => displayComment(comment));
    } catch (error){
        console.log('Failed to load comments:', error);
    }
}

async function handleFormSubmit(event){
    event.preventDefault();
    if (!checkValidity()){
        return false;
    }

    try{
        const newComment = createCommentObject();
        await bandSiteApi.postComment(newComment);
        await retrieveAndDisplayComments();
        resetFormField();

    } catch(error){
        console.log('Failed to post comment:', error);
    }
}

retrieveAndDisplayComments();

//on submit, run a function that creates and adds comment to the section
const submitButton = document.querySelector('.add-comments__form');
submitButton.addEventListener('submit', handleFormSubmit);