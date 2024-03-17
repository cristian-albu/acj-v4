"use client";
import { Button, Container, Section, Wrapper } from "@/components";
import { T_HomepageData } from "@/data/homepage-data";
import React, { FC } from "react";

const HomeView: FC<T_HomepageData> = ({ title }) => {
  return (
    <Section bg={"dark"}>
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
