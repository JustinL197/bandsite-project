import { BandSiteApi, apiKey } from "./band-site-api.js";

const bandSiteApi = new BandSiteApi(apiKey);
const mainContainer = document.querySelector('.shows__main-container');

// function to modify .createElement to add className.
function createElementWithClass(tagName, className){
    const element = document.createElement(tagName);
    element.classList = className;
    return element
}

function formatDate(timestamp){
    const date = new Date(timestamp);
    const formatter = new Intl.DateTimeFormat('en-US', {
        weekday: 'short',
        month: 'short',
        day: '2-digit',
        year: 'numeric'
    });
    return formatter.format(date);
}

//function to display container for the headers in the tablet/desktop viewport
function createHeaderContainer(){
    const headingContainerElem = createElementWithClass('div', 'shows__heading-container');

    const dateElem = createElementWithClass('h3', 'shows__heading-container--dateTimeLocation');
    dateElem.innerText = 'DATE';

    const venueElem = createElementWithClass('h3', 'shows__heading-container--dateTimeLocation');
    venueElem.innerText = 'VENUE';

    const locationElem = createElementWithClass('h3', 'shows__heading-container--dateTimeLocation');
    locationElem.innerText = 'LOCATION';

    const placeHolderElem = createElementWithClass('h3', 'shows__heading-container--dateTimeLocation');
    placeHolderElem.classList.add('shows__heading-container--placeholder');
    placeHolderElem.innerText = 'PLACEHOLDER';

    headingContainerElem.appendChild(dateElem);
    headingContainerElem.appendChild(venueElem);
    headingContainerElem.appendChild(locationElem);
    headingContainerElem.appendChild(placeHolderElem);

    mainContainer.appendChild(headingContainerElem);
}

//function to dynamically display shows on the page.
function displayShow(show){
    const showContainerElem = createElementWithClass('div', 'shows__container');
    
    //Date section
    const dateContainerElem = createElementWithClass('div', 'shows__subcontainer')
    const dateHeading = createElementWithClass('h3', 'shows__heading');
    const dateInfo = createElementWithClass('p', 'shows__info');

    //add a modifier for the bolded dates.
    dateInfo.classList.add('shows__info--bold');

    //Venue Section
    const venueContainerElem = createElementWithClass('div', 'shows__subcontainer');
    const venueHeading = createElementWithClass('h3', 'shows__heading');
    const venueInfo = createElementWithClass('p', 'shows__info');

    //Location Section
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
    dateInfo.innerText = formatDate(show.date);
    venueInfo.innerText = show.place;
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

    //append to main container
    mainContainer.appendChild(showContainerElem);
    mainContainer.appendChild(dividerElem);

    setEventListeners();
}   

createHeaderContainer();


async function retrieveAndDisplayShows(){
    try{
        const shows = await bandSiteApi.getShows();
        shows.forEach(show => displayShow(show));
    }catch(error){
        console.error(error.message);
    }
}

function selectDiv(event){
    const divs = document.querySelectorAll('.shows__container');
    divs.forEach(div => {
        div.classList.remove('shows__container--selected');
    });
    event.currentTarget.classList.add('shows__container--selected');
}

function setEventListeners(){
    const divs = document.querySelectorAll('.shows__container');
    divs.forEach(div => {
        div.removeEventListener('click', selectDiv);
        div.addEventListener('click', selectDiv);
    });
}


retrieveAndDisplayShows();