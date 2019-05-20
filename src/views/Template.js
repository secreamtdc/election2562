import React, { useState, useEffect } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";

import { Route, NavLink, BrowserRouter } from "react-router-dom";

import Overview from "./components/overview";
import Pie from "./components/pie";
import QUANTITY from "./components/Quantity";
import Sentiment from "./components/sentiment";
import Each_sen from "./components/each_sen";

import axios from "axios";

const createCallAPI = async (url, data, callback) => {
  try {
    const resp = await axios.post(`${url}`, data);
    callback(resp);
  } catch (error) {
    console.log(error);
    // toastr.error("ERROR", "Something went wrong.");
  }
};
const createCallAPIGet = async (url, data, callback) => {
  try {
    const resp = await axios.get(`${url}`, data);
    callback(resp);
  } catch (error) {
    console.log(error);
    // toastr.error("ERROR", "Something went wrong.");
  }
};

const Template = props => {
const [quantity, setQuantity] = useState([]);
const [sentiment, setSentiment] = useState([]);
const [eachPlus, setEachPlus] = useState([]);
const [eachNegative, setEachNegative] = useState([]);
  useEffect(() => {
    createCallAPI(
      "http://creamjs.me:3002/search/elect62/",
      { },
      (params) => {
        setQuantity(params.data.data);
      }
    );
    createCallAPI(
      "http://creamjs.me:3002/search/sentiment/elect62",
      { },
      (params) => {
        console.log(params.data.data);
        
        setSentiment(params.data.data);
      }
    );
    createCallAPIGet(
      "http://creamjs.me:3002/search/eachPlus",
      { },
      (params) => {
        setEachPlus(params.data.data);
      }
    );
    createCallAPIGet(
      "http://creamjs.me:3002/search/eachNegative",
      { },
      (params) => {
        
        setEachNegative(params.data.data);
      }
    );
  }, []);

  

  return (
    <div>
      <Navbar
      fixed="top" 
        bg=""
        variant=""
        style={{
          backgroundColor: "#303030",
          boxShadow:
            "0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)"
        }}
      >
        <button className="d-lg-none toggle-sidebar">
          <span className="navbar-toggler-icon" />
        </button>
        <Navbar.Brand href="/" style={{ color: "white" }}>
          Elect
        </Navbar.Brand>
        <span className="hidden-xs text-muted">2562</span>
      </Navbar>
      <br/><br/><br/>
      <BrowserRouter>
        <Row className="body">
          <Nav to="/" className="flex-sm-column" id="sidebar">
            <ListGroup className="nav nav-sidebar flex-sm-column">
              <ListGroup.Item>
              <a href="#overview">
                  {" "}
                  <NavLink to="/">
                    <span>Overview</span>
                  </NavLink>
                </a>
                <a href="#sentiment">
                  {" "}
                  <NavLink to="/Sentiment">
                    <span>Sentiment</span>
                  </NavLink>
                </a>
                <a href="#QUANTITY">
                  {" "}
                  <NavLink to="/QUANTITY">
                    <span>Quantity</span>
                  </NavLink>
                </a>
                <a href="#">
                  {" "}
                  <NavLink to="/each_sen">
                    <span>Political Party</span>
                  </NavLink>
                </a>
              </ListGroup.Item>
            </ListGroup>
          </Nav>

          <Col
            xl={{ span: 7, offset: 3 }}
            lg={{ span: 8, offset: 3 }}
            xs={{ span: 8, offset: 2 }}
          >
            <Container>
              <div className="content">
                <Route exact path="/" component={() => <Overview value={quantity}/>} />
                <Route exact path="/Sentiment" component={() => <Sentiment value={sentiment}/> } />
                <Route exact path="/QUANTITY" component={() => <QUANTITY quantity={quantity}/> } />
                <Route exact path="/each_sen" component={() => <Each_sen  eachPlus={eachPlus} eachNegative={eachNegative}/> } />

              </div>
            </Container>
          </Col>
        </Row>
      </BrowserRouter>
    </div>
  );
};

export default Template;
