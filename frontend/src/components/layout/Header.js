import React, { Component } from "react";
import {
  Menu,
  Button,
  Icon,
  Image,
  Dropdown,
  Header as Logo,
} from "semantic-ui-react";

const friendOptions = [
  {
    key: "Jenny Hess",
    text: "Jenny Hess",
    value: "Jenny Hess",
    image: { avatar: true, src: "/logo192.png" },
  },
];

export default class Header extends Component {
  state = {};

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <Menu stackable>
        <Menu.Item href="/">
          <Logo as="h4">
            <Image circular src="/logo192.png" /> Wallaclone
          </Logo>
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item
            href="/register"
            name="features"
            active={activeItem === "features"}
            onClick={this.handleItemClick}
            color="teal"
          >
            Registro
          </Menu.Item>

          <Menu.Item
            href="/login"
            name="login"
            active={activeItem === "login"}
            onClick={this.handleItemClick}
          >
            <Button icon color="teal">
              <Icon name="user circle" />
              Login
            </Button>
          </Menu.Item>

          <Menu.Item>
            <Dropdown
              inline
              options={friendOptions}
              defaultValue={friendOptions[0].value}
            >
              <Dropdown.Menu>
                <Dropdown.Item icon="user" text="Your Profile"></Dropdown.Item>
                <Dropdown.Item
                  icon="newspaper outline"
                  text="Adverts"
                ></Dropdown.Item>
                <Dropdown.Item icon="power off" text="Logout"></Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}
