import Button from "./Button";
import { Link } from "react-router-dom";

function LinkButton({to, text}) {
    return (
        <Button type="button" >
            <Link to={to}>{text}</Link>
        </Button>
    );
}

export default LinkButton;