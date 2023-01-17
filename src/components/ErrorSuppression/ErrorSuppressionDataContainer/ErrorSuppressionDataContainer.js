import { Grid, GridContainer } from "@trussworks/react-uswds";
import React from "react";

export const ErrorSuppressionDataContainer = () => {
    return (
            // This height class is here due to a strange bug where the left nav is too short without it.
            // We may be able to remove this once we implement the table
            <GridContainer className="height-mobile">
                <Grid row>
                    {/* Title goes in this col */}
                    <Grid col={3}></Grid>
                    {/* Add button goes in this col */}
                    <Grid col={3}></Grid>
                </Grid>
                <Grid row>
                    {/* Table goes in this row */}
                </Grid>
            </GridContainer>
    )
}