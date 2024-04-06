const commentsArray = [
    {name:"Victor Pinto", timestamp: "11-02-2023", comment: "This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains."},
    {name: "Christina Cabrera", timestamp: "10/28/2023", comment: "I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day."},
    {name: "Isaac Tadesse", timestamp: "10/20/2023", comment: "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough."}
];

function displayComment(comment){
    const container = document.querySelector('.comments');

    const commentElem = document.createElement('div');
    commentElem.className = "comments__container";

    const avatarElem = document.createElement('div');
    avatarElem.className = 'comments__avatar';

    const subcontainerElem = document.createElement('div');
    subcontainerElem.className = 'comments__container--subcontainer';

    const nameTimeElem = document.createElement('div');
    nameTimeElem.className = 'comments__name-timestamp-container'

    const nameElem = document.createElement('h3');
    nameElem.className = 'comments__name';

    const timestampElem = document.createElement('p');
    timestampElem.className = 'comments__timestamp';

    const textElem = document.createElement('p');
    textElem.className = 'comments__text';

    nameElem.innerText = comment.name;
    timestampElem.innerText = comment.timestamp;
    textElem.innerText = comment.comment;

    //append to the div (commentElem) the elements of the comments.
    commentElem.appendChild(avatarElem);

    nameTimeElem.appendChild(nameElem);
    nameTimeElem.appendChild(timestampElem);

    subcontainerElem.appendChild(nameTimeElem);
    subcontainerElem.appendChild(textElem);

    commentElem.appendChild(subcontainerElem);

    //append to the comments_container from HTML code
    container.appendChild(commentElem);

    //create a divider
    const divider = document.createElement('hr');
    divider.className = 'comments__divider';

    container.appendChild(divider);
}

commentsArray.forEach(comment => displayComment(comment));
    
    