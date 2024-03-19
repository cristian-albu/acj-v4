"use client";
import { COLORS, FADE_IN, SCALE_UP } from "@/lib/constants";
import { generateDateList } from "@/lib/utils";
import React, { ChangeEvent, useId, useMemo, useState } from "react";
import styled from "styled-components";
import { Button, Title } from "..";
import { HiMiniCheck } from "react-icons/hi2";

const today = new Date();
const currMonth = today.getMonth();
const computedNextMonth = currMonth + 1 >= 12 ? 1 : currMonth + 1;

const currMonthArr = generateDateList(currMonth);
const nextMonthArr = generateDateList(computedNextMonth);

const prevFiller: string[] = [];
const prevFillterFirstDay = currMonthArr[0].getDay();
const prevFillerMaxIndex =
  prevFillterFirstDay - 1 >= 0
    ? prevFillterFirstDay - 1
    : 6 - prevFillterFirstDay;

const nextFiller: string[] = [];
const nextFillerFirstDay = nextMonthArr[0].getDay();
const nextFillerMaxIndex =
  nextFillerFirstDay - 1 >= 0 ? nextFillerFirstDay - 1 : 6 - nextFillerFirstDay;

for (let i = 0; i < prevFillerMaxIndex; i++) {
  prevFiller.push(i.toString());
}

for (let i = 0; i < nextFillerMaxIndex; i++) {
  nextFiller.push(i.toString());
}

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const currMonthName = today.toLocaleString("default", { month: "long" });
const nextMonthName = nextMonthArr[0].toLocaleString("default", {
  month: "long",
});

const DatePicker = () => {
  const id = useId();
  const [dateChoice, setDateChoice] = useState<null | Date>(null);
  const [dateList, setDateList] = useState<Date[]>(currMonthArr);

  const isFirst = dateList[0].getMonth() === currMonth;

  const handleDateChoice = (e: ChangeEvent<HTMLFormElement>) => {
    setDateChoice(new Date(e.target.value));
  };

  const handleButton = () => {
    if (isFirst) {
      setDateList(nextMonthArr);
      return;
    } else {
      setDateList(currMonthArr);
    }
  };

  return (
    <DateItemsContainer
      onChange={handleDateChoice}
      onSubmit={(e) => e.preventDefault()}
    >
      <Row>
        <Title>{isFirst ? currMonthName : nextMonthName}</Title>
        <Button onClick={handleButton}>
          {isFirst ? (
            <>
              {nextMonthName} {">"}
            </>
          ) : (
            <>
              {"<"} {currMonthName}
            </>
          )}
        </Button>
      </Row>
      {days.map((e) => (
        <DateFiller key={e}>{e}</DateFiller>
      ))}
      {isFirst
        ? prevFiller.map((e) => <DateFiller key={e} />)
        : nextFiller.map((e) => <DateFiller key={e} />)}

      {dateList.map((e, index) => {
        const isPreviousDate =
          index <= today.getDate() - 1 && currMonth === e.getMonth();
        const displayText = e.toDateString().split(" ")[2];
        const isToday = e.toDateString() === today.toDateString();
        const isChosen = dateChoice?.toDateString() === e.toDateString();
        return (
          <DateItemElementLabel key={e.toString()} $disabled={isPreviousDate}>
            <DateItemElementInput
              type="radio"
              name={id}
              value={e.toDateString()}
              disabled={isPreviousDate}
            />
            <DateItemElement>
              {isToday ? "Today" : displayText}
              {isChosen && (
                <ChoiceIcon>
                  <HiMiniCheck />
                </ChoiceIcon>
              )}
            </DateItemElement>
          </DateItemElementLabel>
        );
      })}
    </DateItemsContainer>
  );
};

export default DatePicker;

const DateItemsContainer = styled.form`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  padding: 2rem;
  margin: auto;
`;

const DateItemElementInput = styled.input`
  width: 0px;
  height: 0px;
`;

const DateItemElement = styled.div<{ $today?: boolean }>`
  width: 100%;
  padding: 1.2rem 0.4rem;
  font-size: 0.9rem;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: 2px solid #d2d2d2;
  outline-offset: -1px;
  transition: all 200ms;
  z-index: 1;
  color: ${({ $today }) => ($today ? COLORS.primary : "inherit")};
`;

const DateItemElementLabel = styled.label<{ $disabled?: boolean }>`
  width: 100%;
  max-width: calc(100% / 7);
  display: flex;
  flex-direction: column;
  cursor: pointer;

  ${DateItemElementInput}:checked + ${DateItemElement} {
    outline-color: ${COLORS.primary};
    outline: 3px solid ${COLORS.primary};
    outline-offset: -3px;
    z-index: 5;
    color: ${COLORS.primary};
    font-weight: bold;
    position: relative;
  }

  ${DateItemElementInput}:disabled + ${DateItemElement} {
    z-index: 0;
    background-color: transparent;
    color: #cdcdcd;
    cursor: default;
    outline-color: #f1f1f1;
  }

  &:hover {
    ${DateItemElement} {
      background-color: ${({ $disabled }) =>
        $disabled ? "transparent" : COLORS.primary};
      color: ${({ $disabled }) => ($disabled ? "inherit" : "white")};
      outline-color: ${({ $disabled }) => !$disabled && COLORS.primary};
    }

    ${DateItemElementInput}:checked + ${DateItemElement} {
      color: white;
    }
  }
`;

const DateFiller = styled.div`
  width: 100%;
  max-width: calc(100% / 7);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.2rem 0.4rem;
  color: #cdcdcd;
`;

const ChoiceIcon = styled.span`
  position: absolute;
  top: 20%;
  right: 10%;
  padding-left: 0.5rem;
  font-size: 0.8rem;
  animation: ${SCALE_UP} 0.2s ease-in-out;
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 1rem;
`;
