import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";

//smoke test
it("Carousel component renders without crashing", function(){
    render(<Carousel />);
})

//snapshot test
it("Carousel component matches snapshot", function(){
  const {asFragment}=render(<Carousel />);
  expect(asFragment()).toMatchSnapshot();
})

it("left arrow moves to previous image", function(){
  const {queryByTestId, queryByAltText}=render(<Carousel />);

  const rightArrow=queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  const leftArrow=queryByTestId("left-arrow");
  fireEvent.click(leftArrow);

  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
})

it("left arrow is missing on first image", function(){
  const {queryByTestId}=render(<Carousel />);
  expect(queryByTestId("left-arrow")).not.toBeInTheDocument();
});

it("right arrow is missing on last image", function(){
  const {queryByTestId}=render(<Carousel />);
  const rightArrow=queryByTestId("right-arrow");
  //click twice to get to the last image
  fireEvent.click(rightArrow);
  fireEvent.click(rightArrow);
  expect(queryByTestId("right-arrow")).not.toBeInTheDocument();
})

it("works when you click on the right arrow", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
});
