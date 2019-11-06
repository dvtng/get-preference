import React from "react";
import { configure, addDecorator } from "@storybook/react";
import "../src/index.css";
import { Mock } from "../src/Mock";

addDecorator(storyFn => <Mock>{storyFn()}</Mock>);

configure(require.context("../src", true, /\.stories\.tsx$/), module);
