import { API } from "../../backend";

export const getProduct = () =>{
    return(
        fetch(`${API}products`,{metho:"GET"}).then(response => {
            return response.json()
        })
        .catch((err)=>{console.log(err) })
    )
}