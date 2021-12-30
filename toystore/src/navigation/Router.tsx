import { MicroFrontend } from '../MicroFrontend';
import { RouteComponentProps, Router as ReachRouter } from "@reach/router";
import { apps } from "../apps"
import { Fragment } from 'react';
import { Welcome } from "./Welcome";
import { Container } from 'semantic-ui-react';

export const NotFound: React.FunctionComponent<RouteComponentProps> = () => <Fragment>Are you lost?</Fragment>


export const Router = () => {
    return <Container id="router" style={{ height: "100vh", width: "100%" }} ><ReachRouter>
        <Welcome key="welcome" path="/" />
        {/*eslint-disable no-restricted-globals*/}
        {apps.map((app) => <MicroFrontend key={app.name} {...app} history={history} window={window} document={document} />)}
        < NotFound key="default" default />
    </ReachRouter>
    </Container>
}
