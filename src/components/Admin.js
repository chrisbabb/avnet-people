import React from 'react';
import AdminHeader from './AdminHeader';
import { useRecoilState } from 'recoil';
import { theIsLoggedIn, theAdminView } from '../atoms';
import AdminHome from './AdminHome';
import EditPerson from './EditPerson';
import AddPerson from './AddPerson';

function Admin(){

    const [isLoggedIn, setIsLoggedIn] = useRecoilState(theIsLoggedIn);
    const [adminView, setAdminView] = useRecoilState(theAdminView);

    return(
        <>
            <AdminHeader />

            {   
                adminView[0] === 'ap' ?
                <AddPerson /> :
                adminView[0] === 'ep' ?
                <EditPerson /> :
                <AdminHome />
            }
        </>
    )
}

export default Admin