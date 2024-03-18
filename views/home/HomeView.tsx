"use client";
import { Button, Container, Section, Wrapper } from "@/components";
import Modal from "@/components/modal/Modal";
import { T_HomepageData } from "@/data/page-data/homepage-data";

import React, { FC } from "react";

const SomeItem = () => {
  return (
    <div>
      Some Item
      <Button>Some button</Button>
    </div>
  );
};

const HomeView: FC<T_HomepageData> = ({ title }) => {
  return (
    <Section>
      <Wrapper>
        <Container>
          {title}

          <Modal contentsTitle="Some modal" contents={<SomeItem />}>
            Modal
          </Modal>
        </Container>
      </Wrapper>
    </Section>
  );
};

export default HomeView;
