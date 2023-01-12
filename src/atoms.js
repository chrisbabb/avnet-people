import { atom } from 'recoil';

export const theIsLoggedIn = atom({
    key: 'isLoggedIn',
    default: false
})

export const theFormUserName = atom({
    key: 'formUserName',
    default: ''
})

export const theFormUserPass = atom({
    key: 'formUserPass',
    default: ''
})

export const theResponseData = atom({
    key: 'responseData',
    default: ''
})

export const theDataView = atom({
    key: 'dataView',
    default: ['i', 0, 'i']
})

export const theAdminView = atom({
    key: 'adminView',
    default: ['h', 0]
})

export const theCurrentUser = atom({
    key: 'currentUser',
    default: ''
})

export const thePersonFirstName = atom({
    key: 'personFirstName',
    default: ''
})

export const thePersonLastName = atom({
    key: 'personLastName',
    default: ''
})

export const thePersonTitle = atom({
    key: 'personTitle',
    default: ''
})

export const thePersonSex = atom({
    key: 'personSex',
    default: ''
})

export const thePersonCompany = atom({
    key: 'personCompany',
    default: ''
})

export const thePersonNotes = atom({
    key: 'personNotes',
    default: ''
})

export const thePersonEvents = atom({
    key: 'personEvents',
    default: []
})

export const theLogoName = atom({
    key: 'logoName',
    default: ''
})

export const theEventName = atom({
    key: 'eventName',
    default: ''
})

export const theEventYear = atom({
    key: 'eventYear',
    default: ''
})

export const thePeopleData = atom({
    key: 'peopleData',
    default: ''
})

export const theCurrentPeopleData = atom({
    key: 'currentPeopleData',
    default: ''
})

export const theRefreshPeopleData = atom({
    key: 'refreshPeopleData',
    default: 0
})

export const theCompanyData = atom({
    key: 'companyData',
    default: ''
})

export const theEventData = atom({
    key: 'eventData',
    default: ''
})

export const theCurrentEventData = atom({
    key: 'currentEventData',
    default: ''
})

export const theRefreshEventData = atom({
    key: 'refreshEventData',
    default: 0
})

export const theAdminPersonSearch = atom({
    key: 'adminPersonSearch',
    default: ''
})

export const theListingSearch = atom({
    key: 'listingSearch',
    default: ''
})

export const theIsDataLoaded = atom({
    key: 'isDataLoaded',
    default: false
})