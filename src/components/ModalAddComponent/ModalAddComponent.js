import React, { useEffect, useState } from "react";
import SelectBox from "../DetailsSelectBox/DetailsSelectBox";
import * as mpApi from "../../utils/api/monitoringPlansApi";

import { ArrowBackSharp } from "@material-ui/icons";
import { FormGroup, Label, Button } from "@trussworks/react-uswds";
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
    let components = [];
    let sysComponents = [];
    let main = [];

    let options = [];
    if (comps.length < 1) {
      mpApi.getMonitoringComponents(locationId).then((res) => {
        setComps(res.data);
      });
      mpApi
        .getMonitoringSystemsComponents(locationId, systemId)
        .then((ress) => {
          setSysComps(ress.data);
        });
    } else {
      main = comps;
      if (sysComps.length >= 0) {
        sysComps.forEach((x) => {
          main = main.filter((y) => y.id !== x.componentRecordId);
        });
        setFilteredComps(main);
      }
    }
    if (filteredComps.length >= 1 && unlinkedComponentsOptions.length < 1) {
      options = filteredComps.map((option) => {
        return {
          code: option["id"],
          name: `${option["componentId"]} / ${option["componentTypeCode"]}`,
        };
      });

      options.unshift({ code: "", name: "" });
      setUnlinkedComponentsOptions(options);
    }
  }, [comps, sysComps]);

  const selectingCompHandler = (val) => {
    selectionHandler(filteredComps.filter((x) => x.id === val));
  };
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
              >
                {" "}
                <ArrowBackSharp
                  aria-label="go back to systems details"
                  className=" font-body-sm backBTNColor position-relative top-neg-2px"
                />
              </Button>

              <h4 className="text-bold float-left">{title}</h4>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className=" float-left">
          <FormGroup className="margin-bottom-1">
            <Label test-id={caption} htmlFor={caption}>
              {caption}
            </Label>
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
            />
          </FormGroup>
        </div>
      </div>
    </div>
  );
};

export default ModalAddComponent;
