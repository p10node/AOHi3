// Copyright 2024 pierreneter. All rights reserved.

import React from "react";
import Container from "../Common/Container";

const Footer: React.FC = () => {
  return (
    <footer className="py-6 hidden">
      <Container>
        <div className="flex justify-between items-center">
          <div className="flex gap-[16px]">Powered by Arweave</div>
          <div className="flex items-center gap-4">&copy; Copyright 2024 pierreneter. All rights reserved.</div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
