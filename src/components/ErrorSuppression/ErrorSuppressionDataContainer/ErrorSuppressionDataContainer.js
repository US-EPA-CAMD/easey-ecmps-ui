import React, {useState} from "react";
import { Grid, GridContainer, Button } from "@trussworks/react-uswds";
import { AddErrorSupressionModal } from "../AddErrorSuppressionModal/AddErrorSuppressionModal";

export const ErrorSuppressionDataContainer = () => {

    const [showModal, setShowModal] = useState(false);

    return (
            <div>
                {/* This height class is here due to a strange bug where the left nav is too short without it.
                We may be able to remove this once we implement the table */}
                {showModal  ? <AddErrorSupressionModal showModal={showModal} close={()=>setShowModal(false)}/> : null}
                <GridContainer className="height-mobile padding-left-0 margin-left-0 padding-right-0">
                    <Grid row>
                        {/* Add button goes in this col */}
                        <Grid col={3}><Button className="margin-top-4" onClick={()=>setShowModal(true)}>Add Suppression</Button></Grid>
                    </Grid>
                    <Grid row>
                        {/* Table goes in this row */}
                    </Grid>
                </GridContainer>
            </div>
    )
}