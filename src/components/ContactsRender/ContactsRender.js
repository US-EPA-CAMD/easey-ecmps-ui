
import React from "react";
import ContactsCard from "../ContactsCard/ContactsCard";
import ContactsRoleCard from "../ContactsRoleCard/ContactsRoleCard";
import './ContactsRender.scss';
const ContactsRender = ({ contacts, contactsRoles }) => {
  return (
    <div className="contacts">
      {contactsRoles.map((rolesInfo) => {
        return rolesInfo.map((info, index) => {
          return info.units.length > 0 ? (
            <ContactsRoleCard key={index} info={info} />
          ) : (
            ""
          );
        });
      })}
      {contacts.map((info, index) => {
        return (
          <div key={index}>
            <hr />
            <ContactsCard info={info} />
          </div>
        );
      })}
    </div>
  );
};

export default ContactsRender;
