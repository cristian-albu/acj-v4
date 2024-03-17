"use client";
import { Button, Container, Section, Wrapper } from "@/components";
import { T_HomepageData } from "@/data/page-data/homepage-data";

import React, { FC } from "react";

const HomeView: FC<T_HomepageData> = ({ title }) => {
  return (
    <Section>
      <Wrapper>
        <Container>
          {title}
          <Button>Text</Button>
        </Container>
      </Wrapper>
    </Section>
  );
};

export default HomeView;
