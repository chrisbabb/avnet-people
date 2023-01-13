import React from 'react';
import EditImage from '../images/edit_ico.png'
import TrashImage from '../images/trash_ico.png'
import { useRecoilState } from 'recoil';
import { theRefreshEventData } from '../atoms';


function AdminPersonListing(props){

    const [refreshEventData, setRefreshEventData] = useRecoilState(theRefreshEventData);


    function deletePerson(id){
        fetch(`https://oyster-app-7q899.ondigitalocean.app/avnet-people-backend/corp_events/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `JWT ${localStorage.getItem('token')}`
            }
        })
        .then(setRefreshEventData(refreshEventData + 1))
    }

    function editPerson(id){
        return;
    }

    return(
        <tr>
            <td>{props.id}</td>
            <td>{props.name}</td>
            <td>{props.date}</td>
            <td><img onClick={() => editPerson(props.id)} src={EditImage} /> <img onClick={() => deletePerson(props.id)} src={TrashImage} /></td>
        </tr>
    )
}

export default AdminPersonListing