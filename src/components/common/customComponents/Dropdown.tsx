import React, { useState, useRef, useEffect } from "react";
import useClickOutside from "./useClickOutside";
import styled from "styled-components";
import { Icon } from "@equinor/eds-core-react";
import { arrow_drop_up, arrow_drop_down } from "@equinor/eds-icons";
import "./styles.scss";
import { truncate } from '../../common/helpers';

const icons = {
  arrow_drop_up,
  arrow_drop_down
};

Icon.add(icons);

const Dropdown = styled.div<{ isOpen: any }>`
  height: 37px;
  width: ${(props: any) => (props.width ? props.width : "220px")};
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f7f7f7;
  font-family: Equinor;
  letter-spacing: 0.4px;
  border-bottom: ${(props: any) =>
    props.isOpen ? "2px solid #007079" : "1px solid #6f6f6f"};
  border-top: ${(props: any) => (props.isOpen ? "2px solid #007079" : "0px")};
  border-right: ${(props: any) => (props.isOpen ? "2px solid #007079" : "0px")};
  border-left: ${(props: any) => (props.isOpen ? "2px solid #007079" : "0px")};
  overflow:auto;
  &:hover {
    cursor: pointer;
  }
`;

const DropdownOption = styled.p`
  font-family: ${props => props.theme.font};
  font-size: 16px;
  width: ${(props: any) => (props.width ? props.width : "220px")};
  padding-left: 24px;
  padding-top: 16px;
`;

const Label = styled.p`
  height: 16px;
  font-size: 12px;
  line-height: 16px;
  display: flex;
  align-items: center;
  color: #6f6f6f;
  margin: 0px;
  font-weight: 400;
  line-height: 1.333em;
`;

const Meta = styled.div`
  margin-Left:auto;
  height: 16px;
  font-size: 12px;
  line-height: 16px;
  display: flex;
  align-items: center;
  color: #6f6f6f;
  margin: 0px;
  font-weight: 400;
  line-height: 1.333em;
`;

const CoreDevDropdown = (props: any): JSX.Element => {
  let { options, label, meta } = props;
  const [isOpen, setIsOpen] = useState(props.defaultOpen || false);
  let value = "Please select...";
  const [selectedOption, setSelectedOption] = useState({
    key: "",
    displayValue: props.preSlectedValue || "Please select..."
  });

  useEffect(() => {
    document.addEventListener("keydown", listener, false);
    return () => {
      document.removeEventListener("keydown", listener, false);
  }
}, []);
  const listener = (e: any) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    }
  }

  const wrapperRef = useRef(null);
  useClickOutside(wrapperRef, setIsOpen);

  const handleChange = (option: any) => {
    setSelectedOption(option);
    setIsOpen(!isOpen);
    props.onChange(option.key, props.name);
  };

  const renderOptions = (width: string): React.ReactNode => {
    if (options !== undefined && options.length) {
      return (
        <ul style={{ width: width ? width : "220px", maxHeight: '500px', overflow: 'auto' }}>
          {options.map((option: any, i: number) => {
            return (
              <li key={i} onClick={() => handleChange(option)}>
                <DropdownOption>{option.displayValue}</DropdownOption>
              </li>
            );
          })}
        </ul>
      );
    }
  };

  //if (selectedOption.name === 'Loading...' && options !== undefined && options.length) {
  //  setSelectedOption(options[0]);
  //} else {
  //}

  const arrowUp = (
    <Icon name="arrow_drop_up" size={16} style={{ marginRight: "8px" }} />
  );
  const arrowDown = (
    <Icon name="arrow_drop_down" size={16} style={{ marginRight: "8px" }} />
  );

  //setSelectedOption(options[0].name);

  return (
    <div className={"coredev-dropdown"} ref={wrapperRef}>
      <div style={{ display: 'flex' }}>
        <Label>{label}</Label>
        <div style={{ marginLeft: 'auto' }}><Label>{meta}</Label></div>
      </div>
      <Dropdown onClick={() => setIsOpen(!isOpen)} {...props} isOpen={isOpen}>
        <span>{truncate(selectedOption.displayValue, 40)}</span>
        {isOpen ? arrowUp : arrowDown}
      </Dropdown>
      {isOpen && renderOptions(props.width)}
    </div>
  );
};

export default CoreDevDropdown;
