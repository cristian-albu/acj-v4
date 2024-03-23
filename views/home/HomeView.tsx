"use client";
import { Button, Container, Modal, Section, Wrapper } from "@/components";
import DatePicker from "@/components/date-picker/DatePicker";
import { T_HomepageData } from "@/data/page-data/homepage-data";
import { buildsMonths } from "@/lib/utils";
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
            targetContents={"Menu"}
          >
            <SomeItem />
          </Modal>

          <br />
          <br />
          <br />
          <br />

          <Modal
            modalType="popup"
            contentsTitle="Some modal"
            targetContents={"Modal"}
          >
            <DatePicker
              setDateChoice={(date) => console.log(date)}
              months={13}
            />
          </Modal>

          <br />
          <br />
          <br />

          <br />
        </Container>
      </Wrapper>
    </Section>
  );
};

export default HomeView;
