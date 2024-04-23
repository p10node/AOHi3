// Copyright 2024 pierreneter. All rights reserved.

import DaisyPlugin from "daisyui";

/** @type {import('tailwindcss').Config} */

const config = {
  content: [
    "./index.html", //
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/preline/dist/*.js",
    "node_modules/daisyui/dist/**/*.js",
    "node_modules/react-daisyui/dist/**/*.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [DaisyPlugin],
};

export default config;
