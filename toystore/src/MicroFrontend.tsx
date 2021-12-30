import { RouteComponentProps } from "@reach/router";
import { Fragment, useEffect, useState } from "react";
import { App } from "./apps";
import { Helmet } from "react-helmet";
import { Container } from "semantic-ui-react";

export const Error = () => <Fragment>You fucked up</Fragment>

export const MicroFrontend: React.FunctionComponent<RouteComponentProps & App & {
    history: History;
    window: Window;
    document: Document;
}> = ({ url, name, history, window, type }) => {
    const [hasError, setHasError] = useState<boolean>(false);
    const [htmlData, setHtmlData] = useState<string>("");
    useEffect(() => {
        const scriptId = `micro-frontend-script-${name}`;

        const renderMicroFrontend = () => {
            if (type === "React") {
                (window[`render${name}` as any] as any)(`${name}-container`, history);
            } else if (type === "HTML") {
                document.getElementById(`${name}-container`)!.innerHTML = htmlData
            }
        };

        if (type === "React" && document.getElementById(scriptId)) {
            renderMicroFrontend();
            return;
        }
        if (type === "HTML" && htmlData !== "") {
            renderMicroFrontend();
            return;
        }
        if (type === "React") {
            //console.log("here")
            fetch(`${url}/asset-manifest.json`)
                .then((res) => res.json())
                .then((manifest) => {
                    const script = document.createElement("script");
                    script.id = scriptId;
                    script.crossOrigin = "";
                    script.src = `${url}${manifest.files["main.js"]}`;
                    script.onload = () => {
                        renderMicroFrontend();
                    };
                    document.head.appendChild(script);
                }).catch(e => setHasError(true));
        } else if (type === "HTML") {
            fetch(`${url}/index.html`).then(res => res.text()).then(res => {
                const filtered = res.replace("<body", "<div style=\"width:100%; height:100vh\"").replace("</body", "</div").replace(/<link .+>/, "")
                //console.log(filtered)
                setHtmlData(filtered)
            })
        }

        return () => {
            (window[`unmount${name}` as any]) && (window[`unmount${name}` as any] as any)(`${name}-container`);
        };
    });
    return <Container height={"100vh"}>
        <Helmet>
            <title> {name}</title>
        </Helmet>
        {hasError ? <Error /> :
            <main style={{ display: "100vh" }} id={`${name}-container`} />
        }
    </Container>
}