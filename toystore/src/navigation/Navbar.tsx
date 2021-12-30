import { useNavigate } from "@reach/router"
import { Menu, Sidebar } from "semantic-ui-react";
import { apps } from "../apps"

export const Navbar: React.FunctionComponent = () => {
    const navigate = useNavigate();

    return <Sidebar
        as={Menu}
        vertical
        visible
        width="thin"
    >
        {
            apps.map(app => (
                <Menu.Item key={app.name} onClick={() => { console.log("clicked"); navigate(app.path) }} name={app.name} />
            )
            )
        }
    </Sidebar>
}