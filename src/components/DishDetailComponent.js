import React, { Component } from "react";
import {Card,CardImg,CardText,CardBody,CardTitle,Breadcrumb,BreadcrumbItem,Button,Row,Col,Modal,ModalHeader,ModalBody,Label } from "reactstrap";
import { Link } from "react-router-dom";
import { Control, LocalForm, Errors } from "react-redux-form";

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }
  handleSubmit(values) {
    this.toggleModal();
    this.props.addComment(this.props.dishId,values.rating,values.author,values.comment);
  }
  render() {
    const required = val => val && val.length;
    const maxLength = len => val => !val || val.length <= len;
    const minLength = len => val => val && val.length >= len;
    return (
      <div>
        <Button outline onClick={this.toggleModal}>
          <span className="fa fa-edit fa-lg"></span> Submit Comment
        </Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={values => this.handleSubmit(values)}>
              <Row className="form-group">
                <Label htmlFor="rating" md={2}>
                  Rating
                </Label>
                <Col md={10}>
                  <Control.select
                    model=".rating"
                    id="rating"
                    name="rating"
                    placeholder="Your Name"
                    className="form-control"
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </Control.select>
                </Col>
              </Row>

              <Row className="form-group">
                <Label htmlFor="firstname" md={2}>
                  Your Name
                </Label>
                <Col md={10}>
                  <Control.text
                    model=".author"
                    id="author"
                    name="author"
                    placeholder="Your Name"
                    className="form-control"
                    validators={{
                      required,
                      minLength: minLength(3),
                      maxLength: maxLength(15)
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".author"
                    show="touched"
                    messages={{
                      required: "Required",
                      minLength: "Must be greater than 2 characters",
                      maxLength: "Must be 15 characters or less"
                    }}
                  />
                </Col>
              </Row>

              <Row className="form-group">
                <Label htmlFor="comment" md={2}>
                  Comment
                </Label>
                <Col md={10}>
                  <Control.textarea
                    model=".comment"
                    id="comment"
                    name="comment"
                    rows="6"
                    className="form-control"
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Col md={{ size: 5, offset: 2 }}>
                  <Button type="submit" color="primary">
                    Submit
                  </Button>
                </Col>
              </Row>
            </LocalForm>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

function RenderDish({ dish }) {
  if (dish === null)
  return <div />;
  return (
    <div className="col-12">
      <Card>
        <CardImg top src={dish.image} alt={dish.name} />
        <CardBody>
          <CardTitle>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
    </div>
  );
}

function RenderComments({ comments, addComment , dishId }) {
  const comm = comments.map(comment => {
    return (
      <div>
        <ul class="list-unstyled">
          <li>{comment.comment}</li>
          <li>
            --{comment.author},{" "}
            {new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "short",
              day: "2-digit"
            }).format(new Date(Date.parse(comment.date)))}
          </li>
        </ul>
      </div>
    );
  });
  if (comments === null) return <div />;
  return (
    <div className="col-12 ">
      <h4>Comments</h4>
      <div>{comm}</div>
      <div>
        <CommentForm dishId={dishId} addComment={addComment} />
      </div>
    </div>
  );
}

const DishDetail = props => {
  if (props.dish)
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/menu">Menu</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{props.dish.name}</h3>
            <hr />
          </div>
        </div>

        <div className="row">
          <div className="col">
            <RenderDish dish={props.dish} />
          </div>
          <div className="col">
            <RenderComments comments={props.comments}
            addComment={props.addComment}
            dishId={props.dish.id} />
          </div>
        </div>
      </div>
    );

};

export default DishDetail;
