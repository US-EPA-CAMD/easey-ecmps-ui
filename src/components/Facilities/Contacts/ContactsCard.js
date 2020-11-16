import React from "react";
import "./ContactsCard.css";
const ContactsCard = ({ info, resp }) => {
  return (
    <div className="row cols-2">
      <p className="column colInfo">
        <strong>Name: </strong>
        {info.name}
        <br />
        <strong>Title: </strong>
        {info.title}
        <br />
        <strong>Company: </strong>
        {info.company}
        <br />
        <strong>Email: </strong>
        <a href={`mailto:${info.email}`}>{info.email}</a>
        <br />
        <strong>Phone: </strong>
        {info.phone}
        <br />
        <strong>Address: </strong>
        {info.address[0]}
        <br />
        {info.address[1]}
      </p>
      <div className="column colInfo">
        <strong>Responsibilities: </strong>
        <br />
        <ul>
          {info.responsibilities.map((data) => {
            return <li key={data}>{data}</li>;
          })}
        </ul>
        <br />
      </div>
    </div>
  );
};

export default ContactsCard;
