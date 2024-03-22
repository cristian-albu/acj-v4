"use client";
import { COLORS, FADE_IN, SCALE_UP } from "@/lib/constants";
import {
  T_MonthObject,
  buildFiller,
  buildsMonths,
  days,
  generateDateList,
  getMonthName,
} from "@/lib/utils";
import React, { ChangeEvent, FC, useId, useMemo, useState } from "react";
import styled from "styled-components";
import { Button, Title } from "..";
import {
  HiArrowSmallLeft,
  HiArrowSmallRight,
  HiMiniCheck,
} from "react-icons/hi2";

const today = new Date();

type T_DatePickerProps = {
  setDateChoice: (choice: Date) => void;
  months: number;
};

const DatePicker: FC<T_DatePickerProps> = ({ setDateChoice, months }) => {
  const id = useId();

  const monthArr = useMemo(() => buildsMonths(months), [months]);

  const [dateChoice, setDateChoiceState] = useState<null | Date>(null);
  const [dateList, setDateList] = useState<T_MonthObject>(monthArr[0]);
  const monthIndex = monthArr.findIndex((e) => e.index === dateList.index);

  const handleDateChoice = (e: ChangeEvent<HTMLFormElement>) => {
    const choice = new Date(e.target.value);
    setDateChoiceState(choice);
    setDateChoice(choice);
  };

  const handleNext = () => {
    if (monthIndex < monthArr.length - 1) {
      setDateList(monthArr[monthIndex + 1]);
    }
  };

  const handlePrevious = () => {
    if (monthIndex > 0) {
      setDateList(monthArr[monthIndex - 1]);
    }
  };

  console.log(monthIndex, monthArr.length);
  return (
    <DateItemsContainer
      onChange={handleDateChoice}
      onSubmit={(e) => e.preventDefault()}
    >
      <Row>
        <Title>{dateList.monthName}</Title>

        <Button onClick={handlePrevious} disabled={monthIndex <= 0}>
          <HiArrowSmallLeft />
        </Button>

        <Button
          onClick={handleNext}
          disabled={monthIndex >= monthArr.length - 1}
        >
          <HiArrowSmallRight />
        </Button>
      </Row>
      {days.map((e) => (
        <DateFiller key={e}>{e}</DateFiller>
      ))}
      {dateList.monthFiller.map((e) => (
        <DateFiller key={e} />
      ))}

      {dateList.monthDates.map((e, index) => {
        const isPreviousDate =
          index <= today.getDate() - 1 && today.getMonth() === e.getMonth();
        return (
          <DateItemElementLabel
            key={e.toString()}
            $disabled={isPreviousDate}
            $animationDelay={(index + 1) * 15}
          >
            <DateItemElementInput
              type="radio"
              name={id}
              value={e.toDateString()}
              disabled={isPreviousDate}
              defaultChecked={dateChoice?.toDateString() === e.toDateString()}
            />
            <DateItemElement>
              {e.toDateString() === today.toDateString()
                ? "Today"
                : e.toDateString().split(" ")[2]}
              {dateChoice?.toDateString() === e.toDateString() && (
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
  position: relative;
  outline: 2px solid #d2d2d2;
  outline-offset: -1px;
  transition: all 200ms;
  z-index: 1;
  color: ${({ $today }) => ($today ? COLORS.primary : "inherit")};
`;

const DateItemElementLabel = styled.label<{
  $disabled?: boolean;
  $animationDelay: number;
}>`
  width: 100%;
  max-width: calc(100% / 7);
  display: flex;
  flex-direction: column;
  cursor: pointer;
  position: relative;
  opacity: 0;
  animation: ${FADE_IN} 0.2s ease-in-out forwards;
  animation-delay: ${({ $animationDelay }) => $animationDelay}ms;

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
