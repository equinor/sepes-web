/*eslint-disable */
import React, { useState, useRef, useEffect } from 'react';
import useClickOutside from './useClickOutside';
import styled from 'styled-components';
import { Icon } from '@equinor/eds-core-react';
import { arrow_drop_up, arrow_drop_down } from '@equinor/eds-icons';
import './styles.scss';
import { truncate } from '../helpers';

const icons = {
    arrow_drop_up,
    arrow_drop_down
};

Icon.add(icons);

const Dropdown = styled.div<{ isOpen: any; color: any }>`
    height: 37px;
    width: ${(props: any) => (props.width ? props.width : '220px')};
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: ${(props: any) => (props.color ? props.color : '#f7f7f7')};
    font-family: Equinor;
    letter-spacing: 0.4px;
    outline-color: #007079;
    border-bottom: ${(props: any) => (props.isOpen ? '0px solid #007079' : '1px solid #6f6f6f')};
    border-top: ${(props: any) => (props.isOpen ? '0px solid #007079' : '0px')};
    border-right: ${(props: any) => (props.isOpen ? '0px solid #007079' : '0px')};
    border-left: ${(props: any) => (props.isOpen ? '0px solid #007079' : '0px')};
    &:hover {
        cursor: pointer;
    }
`;
/*
    border-bottom: ${(props: any) => (props.isOpen ? '2px solid #007079' : '1px solid #6f6f6f')};
    border-top: ${(props: any) => (props.isOpen ? '2px solid #007079' : '0px')};
    border-right: ${(props: any) => (props.isOpen ? '2px solid #007079' : '0px')};
    border-left: ${(props: any) => (props.isOpen ? '2px solid #007079' : '0px')};
*/

const DropdownOption = styled.p`
    font-family: ${(props) => props.theme.font};
    font-size: 16px;
    width: ${(props: any) => (props.width ? props.width : '220px')};
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
/*
const Meta = styled.div`
    margin-left: auto;
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
*/

const CoreDevDropdown = (props: any) => {
    const { options, label, meta } = props;
    const [isOpen, setIsOpen] = useState(props.defaultOpen || false);
    const useOverflow = props.useOverflow || false;
    const [selectedOption, setSelectedOption] = useState({
        key: '',
        displayValue: props.preSlectedValue || 'Please select...'
    });

    useEffect(() => {
        if (props.resetState) {
            setSelectedOption({
                key: '',
                displayValue: 'Please select...'
            });
        }
        document.addEventListener('keydown', listener, false);
        return () => {
            document.removeEventListener('keydown', listener, false);
        };
    }, [props.resetState]);
    const listener = (e: any) => {
        if (e.key === 'Escape') {
            setIsOpen(false);
        }
    };

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
                <ul
                    style={{
                        width: width ? width : '220px',
                        maxHeight: '500px',
                        overflow: useOverflow ? 'auto' : 'visible'
                    }}
                >
                    {options.map((option: any, i: number) => {
                        return (
                            <li key={option.displayValue} onMouseDown={() => handleChange(option)}>
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

    const arrowUp = <Icon name="arrow_drop_up" size={16} style={{ marginRight: '8px' }} />;
    const arrowDown = <Icon name="arrow_drop_down" size={16} style={{ marginRight: '8px' }} />;

    //setSelectedOption(options[0].name);

    return (
        <div
            style={{
                opacity: props.disabled ? 0.5 : 1,
                pointerEvents: props.disabled ? 'none' : 'initial'
            }}
            className={'coredev-dropdown'}
            ref={wrapperRef}
            onFocus={() => {
                setIsOpen(true);
            }}
            onBlur={() => {
                setIsOpen(false);
            }}
        >
            <div style={{ display: 'flex' }}>
                <Label>{label}</Label>
                <div style={{ marginLeft: 'auto' }}>
                    <Label>{meta}</Label>
                </div>
            </div>
            <Dropdown
                onMouseDown={() => {
                    setIsOpen(!isOpen);
                }}
                {...props}
                isOpen={isOpen}
                color={props.color}
            >
                <span>{truncate(selectedOption.displayValue, 40)}</span>
                {isOpen ? arrowUp : arrowDown}
            </Dropdown>
            {isOpen && renderOptions(props.width)}
        </div>
    );
};

export default CoreDevDropdown;
