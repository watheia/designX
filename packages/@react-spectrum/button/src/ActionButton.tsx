/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import { useButton } from "@react-aria/button";
import { FocusRing } from "@react-aria/focus";
import { useHover } from "@react-aria/interactions";
import { mergeProps } from "@react-aria/utils";
import { useProviderProps } from "@react-spectrum/provider";
import { Text } from "@react-spectrum/text";
import { classNames, SlotProvider, useFocusableRef, useStyleProps } from "@react-spectrum/utils";
import { SpectrumActionButtonProps } from "@react-types/button";
import { FocusableRef } from "@react-types/shared";
import styles from "@watheia/spectrum-css-temp/components/button/vars.css";
import React from "react";

function ActionButton(props: SpectrumActionButtonProps, ref: FocusableRef<HTMLButtonElement>) {
  props = useProviderProps(props);
  let {
    isQuiet,
    isDisabled,
    staticColor,
    children,
    autoFocus,
    ...otherProps
  } = props;

  let domRef = useFocusableRef(ref);
  let {buttonProps, isPressed} = useButton(props, domRef);
  let {hoverProps, isHovered} = useHover({isDisabled});
  let {styleProps} = useStyleProps(otherProps);
  let isTextOnly = React.Children.toArray(props.children).every(c => !React.isValidElement(c));

  return (
    <FocusRing focusRingClass={classNames(styles, "focus-ring")} autoFocus={autoFocus}>
      <button
        {...styleProps}
        {...mergeProps(buttonProps, hoverProps)}
        ref={domRef}
        className={
          classNames(
            styles,
            "spectrum-ActionButton",
            {
              "spectrum-ActionButton--quiet": isQuiet,
              "spectrum-ActionButton--staticColor": !!staticColor,
              "spectrum-ActionButton--staticWhite": staticColor === "white",
              "spectrum-ActionButton--staticBlack": staticColor === "black",
              "is-active": isPressed,
              "is-disabled": isDisabled,
              "is-hovered": isHovered
            },
            styleProps.className
          )
        }>
        <SlotProvider
          slots={{
            icon: {
              size: "S",
              UNSAFE_className: classNames(styles, "spectrum-Icon")
            },
            text: {
              UNSAFE_className: classNames(styles, "spectrum-ActionButton-label")
            }
          }}>
          {typeof children === "string" || isTextOnly
            ? <Text>{children}</Text>
            : children}
        </SlotProvider>
      </button>
    </FocusRing>
  );
}

/**
 * ActionButtons allow users to perform an action.
 * They’re used for similar, task-based options within a workflow, and are ideal for interfaces where buttons aren’t meant to draw a lot of attention.
 */
let _ActionButton = React.forwardRef(ActionButton);
export { _ActionButton as ActionButton };

