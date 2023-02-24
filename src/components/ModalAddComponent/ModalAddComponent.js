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

      if (sysComps.length >= 1) {
        sysComps.forEach((x) => {
          main = main.filter((y) => y.id !== x.componentRecordId);
        });
        setFilteredComps(main);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [comps, sysComps]);
  useEffect(() => {

    let options = [];


    if (filteredComps.length >= 1 && unlinkedComponentsOptions.length < 1) {
      options = filteredComps.map((option) => {
        return {
          code: option["id"],
          name: `${option["componentId"]} / ${option["componentTypeCode"]}`,
        };
      });

      options.unshift({ code: "", name: "--- Select a value ---" });
      setUnlinkedComponentsOptions(options);
    }
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
