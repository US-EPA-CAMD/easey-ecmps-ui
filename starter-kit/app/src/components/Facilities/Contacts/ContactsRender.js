import React from 'react'
import ContactsCard from "./ContactsCard";
import ContactsRoleCard from "./ContactsRoleCard";

const ContactsRender = ({contacts, contactsRoles}) => {
    return (
        <div>
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
    )
}

export default ContactsRender
