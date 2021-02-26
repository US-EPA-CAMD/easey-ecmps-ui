import React from "react";
import { MegaMenu, NavDropDownButton, Link } from "@trussworks/react-uswds";

const Menu = (props) => {
  const subMenuCreation = (arrayTopics) => {
    const title = arrayTopics[0].title;
    return arrayTopics
      .filter((val, ind) => ind !== 0)
      .map((value, index) => {
        return (
          <Link href={value.link} target="_blank" key={index} title={title}>
            {value.name}
          </Link>
        );
      });
  };

  const menuCreation = () => {
    return props.map((val, index) => {
      return subMenuCreation(val);
    });
  };
  const menu = menuCreation();

  const [open, setOpen] = React.useState(
    props.map(() => {
      return false;
    })
  );

  const menuToggle = (index, value) => {
    const newOpenMenu = [...open];
    newOpenMenu[index] = !value;
    setOpen(newOpenMenu);
  };

  return menu.map((subMenu, index) => {
    return (
      <>
        <NavDropDownButton
          onToggle={(): void => {
            menuToggle(index, open[index]);
          }}
          menuId={subMenu[index].props.title + "MenuDropDown"}
          isOpen={open[index]}
          label={subMenu[index].props.title}
          isCurrent={open[index]}
        />
        <MegaMenu
          key={index}
          items={[subMenu]}
          isOpen={open[index]}
          id={subMenu[index].props.title + "MenuDropDown"}
        />
      </>
    );
  });
};

export default Menu;
