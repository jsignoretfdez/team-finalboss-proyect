import React from "react";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";

class Footer extends React.Component {
  render() {
    return (
      <Card className="text-center">
        <Card.Footer className="text-muted">
          Wallaclone @ {new Date().getFullYear()}
        </Card.Footer>
      </Card>
    );
  }
}
export default Footer;
