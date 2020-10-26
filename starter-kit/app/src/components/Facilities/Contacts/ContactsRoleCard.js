import React from "react";
import "./ContactsRoleCard.css";
const ContactsRoleCard = ({ info }) => {
  return (
    <div>
      <div>
        <h4 className="titleBox">{info.company}</h4>
      </div>
      <strong>Role: </strong> {info.role}
      <br />
      <strong>Unit(s): </strong>{" "}
      {info.units.map((unit, index) => {
        return (index ? ", " : "") + unit;
      })}
    </div>
  );
};

export default ContactsRoleCard;
