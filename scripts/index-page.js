import { BandSiteApi, apiKey } from "./band-site-api.js";

const bandSiteApi = new BandSiteApi(apiKey);
const commentsSection = document.querySelector('.comments');
const nameInput = document.getElementById('name');
const commentInput = document.getElementById('comment');

 // function to modify .createElement to add className.
 function createElementWithClass(tagName, className){
    const element = document.createElement(tagName);
    element.className = className;
    return element;
}

function formatDate(timestamp){
    const date = new Date(timestamp);
    return `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}/${date.getFullYear()}`;
}

//function to dynamically display comments
function displayComment(comment){

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
    timeStampElem.innerText = formatDate(comment.timestamp);
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
    
    const newComment = {
        name: nameInput.value,
        comment: commentInput.value
    };
    return newComment;
}

//function to clear the comments section
function clearSection(){
    while (commentsSection.firstChild){
        commentsSection.removeChild(commentsSection.firstChild);
    }
}

//function to reset the form field and submitting
function resetFormField(){
    document.querySelector('.add-comments__form').reset();
}

function checkValidity(){
    let validator = true;

    if (!nameInput.value.trim()){
        nameInput.classList.add('comments__invalid');
        validator = false;
    } else{
        nameInput.classList.remove('comments__invalid');
    }

    if (!commentInput.value.trim()){
        commentInput.classList.add('comments__invalid');
        validator = false;
    } else{
        commentInput.classList.remove('comments__invalid');
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
        console.error('Failed to load comments:', error);
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
        console.error('Failed to post comment:', error);
    }
}

//wait for DOM to be ready before running retrieveAndDIsplayComments().
document.addEventListener('DOMContentLoaded', () => {
    retrieveAndDisplayComments();
    document.querySelector('.add-comments__form').addEventListener('submit', handleFormSubmit);
});