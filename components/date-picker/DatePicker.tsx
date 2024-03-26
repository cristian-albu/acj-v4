"use client";
import { COLORS, FADE_IN, SCALE_UP } from "@/lib/constants";
import { buildsMonths, days } from "@/lib/utils";
import React, { ChangeEvent, FC, useId, useMemo, useState } from "react";
import styled from "styled-components";
import { Button, Title } from "..";
import {
  HiArrowSmallLeft,
  HiArrowSmallRight,
  HiMiniCheck,
} from "react-icons/hi2";

const today = new Date();

export type T_DatePickerProps = {
  setDateChoice: (choice: Date) => void;
  months: number;
};

const DatePicker: FC<T_DatePickerProps> = ({ setDateChoice, months }) => {
  const id = useId();

  const monthArr = useMemo(() => buildsMonths(months), [months]);

  const [dateChoice, setDateChoiceState] = useState<null | Date>(null);
  const [dateListIndex, setDateListIndex] = useState<number>(0);

  const handleDateChoice = (e: ChangeEvent<HTMLFormElement>) => {
    const choice = new Date(e.target.value);
    setDateChoiceState(choice);
    setDateChoice(choice);
  };

  const handleNext = () => {
    if (dateListIndex < monthArr.length - 1) {
      setDateListIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (dateListIndex > 0) {
      setDateListIndex((prev) => prev - 1);
    }
  };

  return (
    <DateItemsContainer
      onChange={handleDateChoice}
      onSubmit={(e) => e.preventDefault()}
    >
      <Row>
        <Title headingSize={2}>{monthArr[dateListIndex].monthName}</Title>

        <Button
          onClick={handlePrevious}
          disabled={dateListIndex <= 0}
          aria-label="Previous Month"
        >
          <HiArrowSmallLeft />
        </Button>

        <ButtonSpace />
        <Button
          onClick={handleNext}
          disabled={dateListIndex >= monthArr.length - 1}
          aria-label="Next Month"
        >
          <HiArrowSmallRight />
        </Button>
      </Row>

      <DateItemElementLabelContainer>
        {days.map((e) => {
          const colChecked =
            (dateChoice && e === dateChoice.toString().split(" ")[0]) || false;

          const isSameMonth =
            (dateChoice &&
              dateChoice.getMonth() ===
                monthArr[dateListIndex].monthDates[0].getMonth()) ||
            false;
          return (
            <DateHeading key={e} $colChecked={colChecked && isSameMonth}>
              {e}
            </DateHeading>
          );
        })}
        {monthArr[dateListIndex].monthFiller.map((e) => (
          <DateFiller key={e} />
        ))}
        {monthArr[dateListIndex].monthDates.map((e, index) => {
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
      </DateItemElementLabelContainer>
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
  padding-top: 6rem;
`;

const DateItemElementInput = styled.input`
  width: 0px;
  height: 0px;
`;

const ButtonSpace = styled.div`
  padding: 0.5rem;
`;

const DateItemElement = styled.div<{ $today?: boolean }>`
  width: 100%;
  padding: 1rem 0.2rem;
  font-size: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border: 2px solid transparent;
  transition: all 200ms;
  z-index: 1;
  border-radius: 0.5rem;
  color: ${({ $today }) => ($today ? COLORS.primary : "inherit")};
`;

const DateItemElementLabelContainer = styled.div`
  width: 100%;
  display: grid;
  gap: 0.5rem;
  grid-template-columns: repeat(7, 1fr);
`;
const DateItemElementLabel = styled.label<{
  $disabled?: boolean;
  $animationDelay: number;
}>`
  width: 100%;

  display: flex;
  flex-direction: column;
  cursor: pointer;
  position: relative;
  opacity: 0;
  overflow: hidden;
  animation: ${FADE_IN} 0.2s ease-in-out forwards;
  animation-delay: ${({ $animationDelay }) => $animationDelay}ms;

  ${DateItemElementInput}:checked + ${DateItemElement} {
    border-color: ${COLORS.primary};
    border: 2px solid ${COLORS.primary};
    z-index: 5;
    color: black;
    font-weight: bold;
    position: relative;
  }

  ${DateItemElementInput}:disabled + ${DateItemElement} {
    z-index: 0;
    background-color: transparent;
    color: #cdcdcd;
    cursor: default;
    border-color: transparent;
  }

  &:hover {
    ${DateItemElement} {
      background-color: ${({ $disabled }) =>
        $disabled ? "transparent" : COLORS.primary};
      color: ${({ $disabled }) => ($disabled ? "inherit" : "black")};
      border-color: ${({ $disabled }) => !$disabled && COLORS.primary};
    }

    ${DateItemElementInput}:checked + ${DateItemElement} {
      color: black;
    }
  }
`;

const DateFiller = styled.div`
  width: 100%;
  max-width: calc(100% / 7);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 0.2rem;
  color: #cdcdcd;
`;

const DateHeading = styled.div<{ $colChecked: boolean }>`
  transition: border-bottom 0.2s ease-in-out;
  border-bottom: 5px solid
    ${({ $colChecked }) => ($colChecked ? COLORS.primary : "#f0f0f0")};
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 0.2rem;
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
