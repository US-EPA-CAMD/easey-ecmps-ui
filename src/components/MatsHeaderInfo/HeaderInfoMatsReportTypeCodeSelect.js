import log from "loglevel";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { loadDropdowns } from "../../store/actions/dropdowns";
import { MATS_REPORT_TYPE_CODES_STORE_NAME } from "../../additional-functions/data-table-section-and-store-names";
import { dataStatus } from "../../utils/constants/dataStatus";
import { DropdownSelection } from "../DropdownSelection/DropdownSelection";
import SizedPreloader from "../SizedPreloader/SizedPreloader";

const HeaderInfoMatsReportTypeCodeSelect = ({
  selected,
  setSelected,

  /* MAPPED PROPS */
  loadDropdownsData,
  options = [],
}) => {
  const [optionsStatus, setOptionsStatus] = useState(dataStatus.IDLE);

  useEffect(() => {
    if (optionsStatus !== dataStatus.IDLE) return;
    if (options.length > 0) {
      setOptionsStatus(dataStatus.SUCCESS);
      return;
    }

    setOptionsStatus(dataStatus.PENDING);
    loadDropdownsData()
      .then(() => {
        setOptionsStatus(dataStatus.SUCCESS);
      })
      .catch((err) => {
        log.error(err);
        setOptionsStatus(dataStatus.ERROR);
      });
  }, [loadDropdownsData, options, optionsStatus]);

  return optionsStatus === dataStatus.PENDING ? (
    <div className="display-flex flex-column flex-justify-end height-full">
      <SizedPreloader size={3} className="margin-bottom-2" />
    </div>
  ) : (
    <DropdownSelection
      caption="Report Types"
      options={options}
      viewKey="name"
      selectKey="code"
      initialSelection={options.findIndex((option) => option.code === selected)}
      selectionHandler={(_index, code) => setSelected(code)}
    />
  );
};

export const mapStateToProps = (state) => ({
  options:
    state.dropdowns[MATS_REPORT_TYPE_CODES_STORE_NAME][
      MATS_REPORT_TYPE_CODES_STORE_NAME
    ],
});

export const mapDispatchToProps = (dispatch) => ({
  loadDropdownsData: async () => {
    await loadDropdowns(MATS_REPORT_TYPE_CODES_STORE_NAME, [
      [MATS_REPORT_TYPE_CODES_STORE_NAME],
    ])(dispatch);
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderInfoMatsReportTypeCodeSelect);
