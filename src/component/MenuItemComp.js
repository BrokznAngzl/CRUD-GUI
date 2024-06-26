import {AppContext} from '../context/AppContext';
import {useContext} from "react";

const MenuItemComp = (props) => {
    const {setPage} = useContext(AppContext);

    return (
        <p className={"flex justify-between content-between w-full hover:bg-gray-700 text-gray-100 cursor-pointer"}
            onClick={(e)=>setPage(props.href)}>
            {props.title}
        </p>
    )

}

export default MenuItemComp;