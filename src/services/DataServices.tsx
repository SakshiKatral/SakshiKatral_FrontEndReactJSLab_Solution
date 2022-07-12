import axios from "axios";
import DataList from "../model/DataList";

const getDataFromServer = () => {
    return axios.get<DataList[]>(`http://localhost:3000/items`)
    .then( response => response.data)
};

const pushDataToServer = ( newpurchase : Omit<DataList, 'id'> ) => {
    // console.log(newpurchase);
    
    return axios.post<DataList>( 
            `http://localhost:3000/items`,
            newpurchase,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        .then( response => response.data )
};

export {
    getDataFromServer,
    pushDataToServer
}




