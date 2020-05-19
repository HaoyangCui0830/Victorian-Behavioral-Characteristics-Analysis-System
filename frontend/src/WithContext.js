import React from "react";
import {AppContext} from "./components/MainContainer";

const withContext = (Component)=>{
    return (props,actions)=>(
        <AppContext.Consumer>
            {({state,actions})=>{
                return <Component {...props} data={state} actions={actions}/>
            }}
        </AppContext.Consumer>
    )
}
export default withContext;