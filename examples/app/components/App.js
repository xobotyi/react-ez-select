import React from "react";
import Scrollbar from "react-scrollbars-custom";
import Body from "./Body";
import Footer from "./Footer";
import Head from "./Head";

const authorName = "Anton Zinovyev";
const authorLink = "https://github.com/xobotyi";
const packageLink = "https://github.com/xobotyi/react-ez-select";
const packageName = "react-ez-select";

export default class App extends React.Component {
    render() {
        return (
            <Scrollbar noDefaultStyles contentProps={{className: "AppContent"}}>
                <Head packageName={packageName} packageLink={packageLink} />
                <Body packageName={packageName} packageLink={packageLink} />
                <Footer
                    authorName={authorName}
                    authorLink={authorLink}
                    packageName={packageName}
                    packageLink={packageLink}
                />
            </Scrollbar>
        );
    }
}
