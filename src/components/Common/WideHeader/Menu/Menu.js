import React from "react";
import { MegaMenu, NavDropDownButton, Link } from "@trussworks/react-uswds";
import "./Menu.css";
const Menu = (props) => {
  const subMenuCreation = (arrayTopics) => {
    const title = arrayTopics[0].name;
    return arrayTopics
      .filter((val, ind) => ind !== 0)
      .map((value, index) => {
        return (
          <Link
            href={value.link}
            target="_blank"
            key={index + title}
            title={title}
          >
            {value.name}
          </Link>
        );
      });
  };
  const titleClick = (e) => {
    e.stopPropagation();
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
    const newOpenMenu = props.map(() => {
      return false;
    });
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
          data-testid="NavDropDownButton"
          menuId={subMenu[index].props.title + "MenuDropDown"}
          isOpen={open[index]}
          label={
            <Link
              className="menuTitleBTN"
              href={props[index][0].link}
              onClick={(e) => titleClick(e)}
              target="_blank"
              key={"btn" + index}
            >
              {subMenu[index].props.title}
            </Link>
          }
          isCurrent={open[index]}
        />
        <MegaMenu
          key={"menu" + index}
          items={[subMenu]}
          isOpen={open[index]}
          id={subMenu[index].props.title + "MenuDropDown"}
        />
      </>
    );
  });
};

export default Menu;
