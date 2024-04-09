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
    const mainContainer = document.querySelector('.shows');

    const containerElem = createElementWithClass('div', 'shows__container');

    const dateHeading = createElementWithClass('h3', 'shows__heading');
    const dateInfo = createElementWithClass('p', 'shows__info');
    dateInfo.classList.add('shows__info--bold');

    const venueHeading = createElementWithClass('h3', 'shows__heading');
    const venueInfo = createElementWithClass('p', 'shows__info');

    const locationHeading = createElementWithClass('h3', 'shows__heading');
    const locationInfo = createElementWithClass('p', 'shows__info');

    const dividerElem = createElementWithClass('hr', 'shows__divider');


    dateHeading.innerText = 'DATE';
    containerElem.appendChild(dateHeading);

    dateInfo.innerText = show.date;
    containerElem.appendChild(dateInfo);

    venueHeading.innerText = 'VENUE';
    containerElem.appendChild(venueHeading);

    venueInfo.innerText = show.venue;
    containerElem.appendChild(venueInfo);
    
    locationHeading.innerText = 'LOCATION';
    containerElem.appendChild(locationHeading);

    locationInfo.innerText = show.location;
    containerElem.appendChild(locationInfo);

    mainContainer.appendChild(containerElem);
    

    //append the button
    const buttonElem = createElementWithClass('button', 'shows__button');
    buttonElem.type = 'button';
    buttonElem.innerText = 'BUY TICKETS';

    mainContainer.appendChild(buttonElem);
    
    mainContainer.appendChild(dividerElem);

}   

showsArray.forEach(show => displayShow(show));