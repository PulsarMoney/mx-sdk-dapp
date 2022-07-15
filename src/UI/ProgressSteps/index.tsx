import React from 'react';
import globalStyles from 'assets/sass/main.scss';
import { Dot } from './Dot';
import classNames from 'classnames';

export interface ProgressStepsType {
  totalSteps: number;
  currentStep: number;
  className?: string;
}

export const ProgressSteps = ({
  totalSteps,
  currentStep,
  className
}: ProgressStepsType) => {
  const dots = [];

  for (let i = 1; i <= totalSteps; i += 1) {
    const isCurrentStep = currentStep === i;
    const color =
      isCurrentStep || i < currentStep
        ? globalStyles.bgPrimary
        : globalStyles.bgSecondary;

    dots.push(
      <Dot
        data-testid={`step${i}${isCurrentStep ? 'active' : ''}`}
        key={i}
        color={color}
      />
    );
  }

  return (
    <div
      className={classNames(
        globalStyles.progressSteps,
        globalStyles.flexRow,
        globalStyles.justifyContentCenter,
        className
      )}
    >
      <div
        className={classNames(
          globalStyles.steps,
          globalStyles.flexRow,
          globalStyles.justifyContentCenter,
          globalStyles.alignItemsCenter,
          globalStyles.positionRelative
        )}
      >
        <hr
          className={classNames(
            globalStyles.positionAbsolute,
            globalStyles.w100,
            globalStyles.m0
          )}
        />
        {dots}
      </div>
    </div>
  );
};