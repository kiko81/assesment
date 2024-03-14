import React from 'react';
import { Button, Col, Row, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import IController from '../interfaces/IController';
import TracApi from '../services/trac-api';
import ControllerForm from './forms/ControllerForm';

type PageState = {
  controllers: IController[],
  existing?: IController,
  showModal: boolean
}

const initialState: PageState = {
  controllers: [],
  showModal: false
}

export default class ControllersPage extends React.Component<{}, PageState> {
  state = initialState;


  componentDidMount = async () => {
    this.setState({ controllers: await TracApi.controllerList() })
  }

  saveAndCloseModal = () => this.setState({ showModal: false, existing: undefined })

  renderTable = () => {
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Controller</th>
            <th>Description</th>
            <th>Saturation</th>
            <th>Trac phases</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {this.state.controllers.map(val => (
            <tr key={val.number}>
              <td>{val.number} ({val.altNumber})</td>
              <td>{val.description}</td>
              <td>{val.saturation &&
                <>Min: <strong>{val.saturation.min}</strong>
                  &nbsp;Middle: <strong>{val.saturation.middle} </strong>
                  &nbsp;Max: <strong>{val.saturation.max}</strong></>}</td>
              <td>{val.tracCycles}</td>
              <td>
              <Button variant="link" onClick={() => {
                this.setState({
                  showModal: true,
                  existing: val
                })
              }}>
                Edit
              </Button>
              <Link to={`controller/${val.number}`}>
                <Button variant='link'>View</Button>
              </Link>
              <Link to={`controller/graph/${val.number}`}>
                <Button variant='link'>Graph</Button>
              </Link>
              </td>
            </tr>
        )
          )}
        </tbody>
      </Table >)
  }

  render = () =>
  (<>
    <br />
    <Row>
      <Col >
        <h2>Controllers</h2>
      </Col>
      <Col >
        <Button className="float-right" onClick={() => {
          this.setState({ showModal: true })
        }}>New
        </Button>
      </Col>
    </Row>
    <br />
    {this.renderTable()}
    {this.state.showModal && <ControllerForm
      data={this.state.existing}
      save={this.saveAndCloseModal}
      existingControllers={this.state.controllers.map(val => val.number)} />}
  </>)
}

