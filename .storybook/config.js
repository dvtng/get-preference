import React from "react";
import { configure, addDecorator } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";
import "../src/index.css";

const DefaultDecorator = storyFn => <MemoryRouter>{storyFn()}</MemoryRouter>;

addDecorator(DefaultDecorator);

configure(require.context("../src", true, /\.stories\.tsx$/), module);
