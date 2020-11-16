import React from "react";

const UnitDetailView = ({ unitDetail }) => {
  let rendered = null;
  if (unitDetail) {
    rendered = (
      <div data-testid="unit-detail-renderer">
        <strong>Unit ID: {unitDetail.unitId}</strong>
        <hr />
        <strong>Status: </strong>
        <span>{unitDetail.status === "OPR" ? "Operating" : "Retired"}</span>
        <hr />

        <strong>Heat Input Capacity (mmBtu/hr): </strong>
        {unitDetail.hi}
        <br />
        {unitDetail.fuel.map((f, i) => (
          <div key={i}>
            <strong>{f.indicator} Fuel: </strong>
            {f.fuel}
          </div>
        ))}
        <hr />

        {unitDetail.controls.map((c, i) => (
          <div key={i}>
            <strong>{c.code} Control: </strong> {c.description}
          </div>
        ))}
        <hr />
        <strong>Programs</strong>
        <ul>
          {unitDetail.programs.map((p, i) => (
            <li key={i}>{p}</li>
          ))}
        </ul>
        <hr />
        {unitDetail.generators.map((g, i) => (
          <p key={i}>
            <strong>Generator ID: </strong>
            {g.id}
            <br />
            <strong>Nameplate Capacity (MW): </strong>
            {g.capacity}
          </p>
        ))}
      </div>
    );
  }
  return rendered;
};

export default UnitDetailView;
