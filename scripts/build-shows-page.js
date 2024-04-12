const showsArray = [
    { date: "Mon Sept 09 2024", venue: "Ronald Lane", location: "San Francisco, CA" },
    { date: "Tue Sept 17 2024", venue: "Pier 3 East", location: "San Francisco, CA" },
    { date: "Sat Oct 12 2024", venue: "View Lounge", location: "San Francisco, CA" },
    { date: "Sat Nov 16 2024", venue: "Hyatt Agency", location: "San Francisco, CA" },
    { date: "Fri Nov 29 2024", venue: "Moscow Center", location: "San Francisco, CA" },
    { date: "Wed Dec 18 2024", venue: "Press Club", location: "San Francisco, CA" }
];

function createElementWithClass(tagName, className){
    const element = document.createElement(tagName);
    element.classList = className;
    return element
}


function displayShow(show){
    const mainContainer = document.querySelector('.shows__main-container');

    const showContainerElem = createElementWithClass('div', 'shows__container');
   
    const dateContainerElem = createElementWithClass('div', 'shows__subcontainer')
    const dateHeading = createElementWithClass('h3', 'shows__heading');
    const dateInfo = createElementWithClass('p', 'shows__info');

    //add a modifier for the bolded dates.
    dateInfo.classList.add('shows__info--bold');

    const venueContainerElem = createElementWithClass('div', 'shows__subcontainer');
    const venueHeading = createElementWithClass('h3', 'shows__heading');
    const venueInfo = createElementWithClass('p', 'shows__info');

    const locationContainerElem = createElementWithClass('div', 'shows__subcontainer')
    locationContainerElem.classList.add('shows__subcontainer--location');
    const locationHeading = createElementWithClass('h3', 'shows__heading');
    const locationInfo = createElementWithClass('p', 'shows__info');

    const dividerElem = createElementWithClass('hr', 'shows__divider');

    //assign values for each heading
    dateHeading.innerText = 'DATE';
    venueHeading.innerText = 'VENUE';
    locationHeading.innerText = 'LOCATION';

    //assign values from each show object
    dateInfo.innerText = show.date;
    venueInfo.innerText = show.venue;
    locationInfo.innerText = show.location;

    //append elements to respective container
    dateContainerElem.appendChild(dateHeading);
    dateContainerElem.appendChild(dateInfo);

    venueContainerElem.appendChild(venueHeading);
    venueContainerElem.appendChild(venueInfo);
    
    locationContainerElem.appendChild(locationHeading);
    locationContainerElem.appendChild(locationInfo);

    //append containers to parent container
    showContainerElem.appendChild(dateContainerElem);
    showContainerElem.appendChild(venueContainerElem);
    showContainerElem.appendChild(locationContainerElem);

    //append the button
    const buttonContainerElem = createElementWithClass('div', 'shows__button-container')
    const buttonElem = createElementWithClass('button', 'shows__button');

    buttonElem.type = 'button';
    buttonElem.innerText = 'BUY TICKETS';

    buttonContainerElem.appendChild(buttonElem);
    showContainerElem.appendChild(buttonContainerElem);

    mainContainer.appendChild(showContainerElem);
    mainContainer.appendChild(dividerElem);
    
}   

function createHeaderContainer(){

    const mainContainer = document.querySelector('.shows__main-container');
    const headingContainerElem = createElementWithClass('div', 'shows__heading-container');

    const dateElem = createElementWithClass('h3', 'shows__header--mixin');
    dateElem.innerText = 'DATE';

    const venueElem = createElementWithClass('h3', 'shows__header--mixin');
    venueElem.innerText = 'VENUE';

    const locationElem = createElementWithClass('h3', 'shows__header--mixin');
    locationElem.innerText = 'LOCATION';

    const placeHolderElem = createElementWithClass('h3', 'shows__header--mixin');
    placeHolderElem.classList.add('shows__header--placeholder');
    placeHolderElem.innerText = 'PLACEHOLDER';

    headingContainerElem.appendChild(dateElem);
    headingContainerElem.appendChild(venueElem);
    headingContainerElem.appendChild(locationElem);
    headingContainerElem.appendChild(placeHolderElem);

    mainContainer.appendChild(headingContainerElem);
    
}

createHeaderContainer();
showsArray.forEach(show => displayShow(show));


document.addEventListener('DOMContentLoaded', () => { 

    const divs = document.querySelectorAll('.shows__container');

    function selectDiv(event){
        event.stopPropagation();
        divs.forEach(div => {
            div.classList.remove('shows__container--selected');
        });

        event.currentTarget.classList.add('shows__container--selected');
    }

    divs.forEach(div => {
        div.addEventListener('click', selectDiv);
    });
});
