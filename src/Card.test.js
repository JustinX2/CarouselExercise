import React from "react";
import { render } from "@testing-library/react";
import Card from "./Card";

//smoke test
test("Card component renders without crashing", function(){
    render(<Card />);
});

//snapshot test
test("Card component matches snapshot", function(){
    const {asFragment}=render(<Card caption="Test Caption" src="test.jpg" currNum={1} totalNum={3}/>);
    expect(asFragment()).toMtachSnapshot();
});