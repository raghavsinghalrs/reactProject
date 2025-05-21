import { useRouteError } from "react-router";

const Error = () => {
    const err = useRouteError();
    return (
        <div style={{display: 'flex', flexDirection : 'column'}}>
            <h3 style={{margin : '0', textAlign : 'center'}}>OOPS!</h3>
            <h4 style={{margin : '0', textAlign : 'center'}}>{err?.error?.message}</h4>
        </div>
    )
}

export default Error;