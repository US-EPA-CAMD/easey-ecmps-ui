import React, { useEffect, useRef } from "react";
import { Button } from "@trussworks/react-uswds";
import { DataTableRender } from "../DataTableRender/DataTableRender";


export const MonitoringPlanEvaluationReport = ({
}) => {

    //Columns to be displayed in the data table
    const columnNames = [
        "Unit/Stack",
        "Severity",
        "Category",
        "Check Code",
        "Result Message"
    ];

    //LOAD FROM API CALL
    const data = [{
        col1: "Sample U/S 1",
        col2: "Severity 1",
        col3: "category 1",
        col4: <Button
            type="button"
            unstyled={true}
            className="text-primary text-underline"
            href="#"
            role="link"
            rel="Check Code 1"
        // title={`Go to ${ele.name} page`}
        // key={ele.url}
        // id={`${ele.name.split(" ").join("")}`}
        >
            Check Code 1
            {/* {ele.name} <OpenInNew /> */}
        </Button>,
        col5: "Lorem ipsum urna, auctor a tincidunt ut, rutrum et ante. Aliquam \
        varius, eros quis vestibulum congue, mauris urna luctus ante, ac \
        rhoncus nulla arcu quis justo. In gravida orci vel ex suscipit, \
        id euismod est accumsan. Fusce quis vehicula nulla. Cras ut \
        efficitur diam, ac suscipit dui. Morbi eu condimentum ex, \
        maximus porttitor urna. Donec non sem vitae ante suscipit \
        sollicitudin sed vitae nunc. Vestibulum vitae velit interdum, \
        viverra lacus sed, condimentum tortor. Pellentesque dictum \
        vehicula erat quis aliquam.Morbi sed consectetur leo, sed \
        lacinia metus.Phasellus tempus velit at dui convallis, eu \
        egestas neque ultrices.Nunc purus risus, commodo nec imperdiet \
        ac, tristique quis nunc.Mauris maximus euismod lacus sagittis \
        efficitur.Ut ut ullamcorper orci, et bibendum felis.Nunc \
        dignissim molestie quam, in vehicula nulla congue tempus.\
        Pellentesque semper tortor felis, nec ultricies elit tristique \
        et.Duis sed massa commodo, pulvinar purus quis, porta sapien.\
        Fusce lacinia, ex id finibus viverra, nisl tellus vehicula \
        purus, ut posuere metus tortor quis metus.Duis eleifend \
        hendrerit eros, sit amet semper justo elementum at.Nulla \
        sagittis, purus quis volutpat pulvinar, risus turpis feugiat \
        lorem, viverra lacinia est nibh id tortor.Morbi interdum auctor \
        turpis id aliquam.In ligula velit, volutpat id orci id, \
        hendrerit bibendum turpis",
    },
    {
        col1: "Sample U/S 2",
        col2: "Severity 2",
        col3: "category 2",
        col4: <Button
            type="button"
            unstyled={true}
            className="text-primary text-underline"
            href="#"
            role="link"
            rel="Check Code 2"
        // title={`Go to ${ele.name} page`}
        // key={ele.url}
        // id={`${ele.name.split(" ").join("")}`}
        >
            Check Code 2
            {/* {ele.name} <OpenInNew /> */}
        </Button>,
        col5: "Dolor sit amet, consectetur adipiscing elit. Vestibulum \
        tincidunt bibendum est nec ullamcorper. Fusce nec turpis sit \
        amet lectus consequat finibus. Duis sit amet orci vel risus \
        vestibulum lacinia. Duis nisi mi, semper elementum cursus non, \
        rutrum non leo. Cras vehicula, tortor eu mollis molestie, risus \
        turpis laoreet est, at cursus magna ipsum in ante. Pellentesque \
        vestibulum pretium blandit.",
    }];

    useEffect(() => {
        //CALL API and load all data points
    }, []);

    const displayCurrentDate = () => {
        const date = new Date();
        var options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };

        return date.toLocaleDateString("en-US", options)
    };

    //Grabs the Report Area for printing (Print button is excluded)
    const print = () => {
        const printArea = document.getElementById("printArea").innerHTML;
        const originalArea = document.body.innerHTML;

        document.body.innerHTML = printArea;
        window.print();
        document.body.innerHTML = originalArea;
    }

    return (
        <>
            <div className="grid-row clearfix position-relative float-right">
                <Button
                    outline={false}
                    tabIndex="0"
                    aria-label={`Print the evaluation report`}
                    className=" padding-1 padding-right-3 padding-left-3 margin-2"
                    onClick={print}
                    id="printBTN"
                    epa-testid="printBTN"
                >
                    Print Report
                </Button>
            </div><br /><br />
            <div className="padding-x-3" id="printArea">
                <div className="grid-row clearfix position-relative text-bold">
                    {displayCurrentDate()}
                </div>
                <div className="grid-row clearfix position-relative padding-top-5 padding-bottom-2">
                    Facility Name: <span className="text-bold"> [Facility Name - from API]</span>
                </div>
                <div className="subheader-wrapper bg-epa-blue-base text-white text-normal">
                    Facility Details
                </div>

                <div className="grid-row clearfix float-left">
                    <div className="grid-col text-right padding-right-1 display-inline-block">
                        Facility ID (ORISPL):<br />
                        Monitoring Plan Location IDs: <br />
                        State:<br />
                        County:<br />
                    </div>
                    <div className="grid-col text-bold text-left display-inline-block text-nowrap">
                        [Facility ID - from API]<br />
                        [Location IDs - from API]<br />
                        [Facility State - from API]<br />
                        [Facility County - from API]<br />
                    </div>
                </div>
                <div className="width-auto">
                    <DataTableRender
                        columnNames={columnNames}
                        data={data}
                        dataLoaded={true}
                        pagination={false}
                        filter={false}
                    />
                </div>
            </div>
        </>
    );
};

export default MonitoringPlanEvaluationReport;