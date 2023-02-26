import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSkullCrossbones } from "@fortawesome/free-solid-svg-icons";

const Close = (props) =>{
    return(
        <FontAwesomeIcon                           
							icon={faSkullCrossbones}
							spin
							size="lg"
							onClick={props.close}
							>Delete
		</FontAwesomeIcon>
    );
}

export default Close;