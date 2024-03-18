"use client";
import { Button, Container, Modal, Section, Wrapper } from "@/components";
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

          <br />
          <br />
          <br />
          <br />
          <Modal
            modalType="menu"
            contentsTitle="Some modal 2"
            contents={<SomeItem />}
          >
            Menu
          </Modal>

          <br />
          <br />
          <br />
          <br />

          <Modal
            modalType="popup"
            contentsTitle="Some modal"
            contents={<SomeItem />}
          >
            Modal
          </Modal>
        </Container>
      </Wrapper>
    </Section>
  );
};

export default HomeView;
