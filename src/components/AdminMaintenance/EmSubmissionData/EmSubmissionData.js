import React from 'react';

import { GridContainer, Grid, Button } from '@trussworks/react-uswds';
import { submissionAccessTitle } from '../../../utils/constants/moduleTitles';
import "./EmSubmissionData.scss"
export const EmSubmissionData = ({ data }) => {

    // return (
    //     <GridContainer className="padding-left-0 margin-left-0 padding-right-0">
    //         <Grid row>
    //             <Grid col={3}>
    //                 <span className="data-container-header">{submissionAccessTitle}</span>
    //             </Grid>
    //             <Grid col={1}>
    //                 <Button >Open</Button>
    //             </Grid>
    //             <Grid col={1}>
    //                 <Button>Extend</Button>
    //             </Grid>
    //             <Grid col={1}>
    //                 <Button>Close</Button>
    //             </Grid>
    //             <Grid col={1}>
    //                 <Button>Approve</Button>
    //             </Grid>
    //         </Grid>
    //         <Grid row></Grid>
    //     </GridContainer>
    // )

    return (
        <div className="padding-left-0 margin-left-0 padding-right-0" >
            <div className="grid-row row-width" >
                <div className="grid-col-4">
                    <span className="data-container-header">{submissionAccessTitle}</span>
                </div>
                <div className="grid-col-8">
                    <div className="grid-row margin-left-3 margin-top-2">
                        <div className="grid-col-3">
                            <Button
                                aria-label="Add"
                                data-testid="es-add"
                            >
                                Open
                            </Button>
                        </div>
                        <div className="grid-col-3">
                            <Button
                                aria-label="Clone"
                                data-testid="es-clone"
                            >
                                Extend
                            </Button>
                        </div>
                        <div className="grid-col-3">
                            <Button
                                aria-label="Deactivate"
                                data-testid="es-deactivate"
                            >
                                Close
                            </Button>
                        </div>
                        <div className="grid-col-3">
                            <Button
                                aria-label="Deactivate"
                                data-testid="es-deactivate"
                            >
                                Approve
                            </Button>


                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}