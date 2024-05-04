import React, { useEffect, useState } from "react";
import SelectBox from "../DetailsSelectBox/DetailsSelectBox";
import * as mpApi from "../../utils/api/monitoringPlansApi";

import { ArrowBackSharp } from "@material-ui/icons";
import { FormGroup, Button } from "@trussworks/react-uswds";
const ModalAddComponent = ({
  locationId,
  systemId,
  selectionHandler,
  caption,
  backBtn,
  title,
}) => {
  const [filteredComps, setFilteredComps] = React.useState([]);
  const [comps, setComps] = React.useState([]);
  const [sysComps, setSysComps] = useState([]);
  const [unlinkedComponentsOptions, setUnlinkedComponentsOptions] = useState(
    []
  );

  useEffect(() => {
    let main = [];
    if (comps.length < 1) {
      mpApi
        .getMonitoringComponents(locationId)
        .then((res) => {
          setComps(res.data);
        })
        .catch((error) => console.log("getMonitoringComponents failed", error));
      mpApi
        .getMonitoringSystemsComponents(locationId, systemId)
        .then((ress) => {
          console.log("ress", ress);
          setSysComps(ress.data);
        })
        .catch((error) =>
          console.log("getMonitoringSystemsComponents failed", error)
        );
    } else {
      main = comps;

      //Filtering system component with system endDate
      const sysWithEndDate = sysComps.filter(
        (sy) => sy.endDate && new Date(sy.endDate) < new Date()
      );

      //Filtering system component with active | no endDate
      const activeSystem = sysComps.filter(
        (sy) => !sy.endDate || new Date(sy?.endDate) > new Date()
      );

      // selecting component from main. that has componentId is equal to sysWithEndDate's componentId
      const componetWithSystemEndDate = main.filter(({ componentId }) =>
        sysWithEndDate.some(
          ({ componentId: sysCompId }) => sysCompId === componentId
        )
      );

      // remove active components
      const componentWithNonActive = componetWithSystemEndDate.filter(
        ({ componentId }) =>
          !activeSystem.some(
            ({ componentId: sysCompId }) => sysCompId === componentId
          )
      );
      // components associated with a monitor location that are NOT already active at the system.
      main = main.filter(
        ({ componentId }) =>
          !sysComps.some(
            ({ componentId: sysCompId }) => sysCompId === componentId
          )
      );

      // merge main and componetWithSystemEndDate. then unique with 'componentId' | Sort by componentId
      const filterCompos = [...main, ...componentWithNonActive]
        .filter(
          (obj1, index, arr) =>
            arr.findIndex((obj2) =>
              ["componentId"].every((item) => obj2[item] === obj1[item])
            ) === index
        )
        .sort(
          (a, b) =>
            a.componentId - b.componentId ||
            a.componentId.localeCompare(b.componentId)
        );
      setFilteredComps(filterCompos);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [comps, sysComps]);
  useEffect(() => {
    let options = [];

    options = filteredComps.map((option) => {
      return {
        code: option["id"],
        name: `${option["componentId"]} / ${option["componentTypeCode"]}`,
      };
    });

    options.unshift({ code: "", name: "--- Select a value ---" });
    setUnlinkedComponentsOptions(options);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredComps]);

  const selectingCompHandler = (val) => {
    selectionHandler(filteredComps.filter((x) => x.id === val));
  };

  const hyphenatedCaption = caption
    ? caption.toLowerCase().split(" ").join("-")
    : "";

  return (
    <div>
      <div className=" padding-left-3">
        <div className="  padding-top-1 padding-bottom-5">
          {backBtn ? (
            <div className="">
              <Button
                onClick={() => backBtn(false)}
                className="float-left margin-right-1"
                unstyled="true"
                epa-testid="backBtn"
                id="backBtn"
                aria-label="go back to systems details"
              >
                {" "}
                <ArrowBackSharp className=" font-body-sm backBTNColor position-relative top-neg-2px" />
              </Button>

              <h3 className="text-bold float-left mobile:font-body-md mobile:text-bold">
                {title}
              </h3>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className=" float-left">
          <FormGroup className="margin-bottom-1">
            <SelectBox
              options={
                unlinkedComponentsOptions !== null ||
                unlinkedComponentsOptions !== undefined ||
                unlinkedComponentsOptions.length < 1
                  ? unlinkedComponentsOptions
                  : [{ code: "", name: "" }]
              }
              initialSelection={0}
              selectKey="code"
              secondOption="name"
              handler={selectingCompHandler}
              caption={caption}
              hyphenatedCaption={hyphenatedCaption}
              id={hyphenatedCaption}
            />
          </FormGroup>
        </div>
      </div>
    </div>
  );
};

export default ModalAddComponent;
