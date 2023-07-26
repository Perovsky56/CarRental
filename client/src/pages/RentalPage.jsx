import { useParams } from "react-router-dom";

export default function RentalPage(){
    const {id} = useParams();
    return (
        <div>
            mój pojedynczy wynajem: {id}
        </div>
    );
}