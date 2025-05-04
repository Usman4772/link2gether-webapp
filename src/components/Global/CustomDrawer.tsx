import React from 'react';
import {Drawer} from 'antd';
import DrawerProps from 'antd/lib/drawer';


interface CustomDrawerProps {
    title:string | React.ReactNode,
    body:React.ReactNode,
    openDrawer: boolean;
    setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>;
    loading?: boolean;
    placement?: "left" | "right" | "top" | "bottom" | undefined;
    onClose?: () => void;
}

function CustomDrawer({title="Title",body,openDrawer, setOpenDrawer, loading,placement="right",onClose=()=>{}}: CustomDrawerProps) {

    return (
        <>
            <Drawer
                closable
                destroyOnClose
                title={title}
                placement={placement}
                open={openDrawer}
                loading={loading}
                onClose={() => {
                    setOpenDrawer(false)
                    onClose()
                }}
            >
                {body?
                    <>
                    {body}
                </>:<div>No Drawer Content</div>}
            </Drawer>
        </>
    );
};
export default CustomDrawer;