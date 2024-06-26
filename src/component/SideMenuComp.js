import MenuItemComp from "./MenuItemComp";

const SideMenuComp = (props) => {
    return (
        <div className="ml-12 flex flex-col pb-2">
            {
                props.sideMenu.map((menu, index) => {
                    return (
                        <div className={"py-1"}>
                            <MenuItemComp key={index} title={menu.title} href={menu.href}/>
                        </div>
                    )
                })
            }
        </div>
    );
};

export default SideMenuComp;
