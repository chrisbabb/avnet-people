import React from 'react';
import EditImage from '../images/edit_ico.png'
import TrashImage from '../images/trash_ico.png'
import { useRecoilState } from 'recoil';
import { thePeopleData, theRefreshPeopleData, theAdminView } from '../atoms';


function AdminPersonListing(props){

    const [peopleData, setPeopleData] = useRecoilState(thePeopleData);
    const [refreshPeopleData, setRefreshPeopleData] = useRecoilState(theRefreshPeopleData);
    const [adminView, setAdminView] = useRecoilState(theAdminView);


    function deletePerson(id){
        fetch(`https://oyster-app-7q899.ondigitalocean.app/avnet-people-backend/people/${id}`, {
            method: 'DELETE'
        })
        .then(setRefreshPeopleData(refreshPeopleData + 1))
    }

    function editPerson(id){
        setRefreshPeopleData(refreshPeopleData + 1);
        setAdminView(['ep', id]);
    }

    return(
        <tr>
            <td>{props.id}</td>
            <td>{props.attributes.firstname}</td>
            <td>{props.attributes.lastname}</td>
            <td>{props.attributes.title}</td>
            <td>{props.attributes.company}</td>
            <td><img onClick={() => editPerson(props.id)} src={EditImage} /> <img onClick={() => deletePerson(props.id)} src={TrashImage} /></td>
        </tr>
    )
}

export default AdminPersonListing