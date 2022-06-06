import React, { useState, useEffect, forwardRef, useRef, useImperativeHandle } from 'react';
import './App.scss';
import Uncheck from './Uncheck';
import Check from './Check';

const Select = ({
  position = 'left',
  classNames = '',
  options = [],
  isMulti,
  renderLabel
}) => {
  const wrapperRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [itemSelected, setItemSelected] = useState({});
  const [displayOptions, setDisplayOptions] = useState(options);
  const [inputValue, setInputValue] = useState('');

  const useOutsideElement = (refOutSide) => {
    useEffect(() => {
      function handleClickOutside(event) {
        if (refOutSide.current && !refOutSide.current.contains(event.target)) {
          setVisible(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [refOutSide]);
  };

  useOutsideElement(wrapperRef);

  const handleClickOutside = () => {
    console.log('clicked outside');
  };

  const handleClickInside = () => {
    console.log('clicked inside');
  };
  const onShow = () => setVisible(prev => !prev);

  const onSelectItem = (item) => () => {
    console.log('selected item', item);
    setItemSelected(item);
    setInputValue(item.label);
  };

  const onChangeSearch = (ev) => {
    const value = ev.target.value;
    const newOptions = options.filter(item => item.label.toLowerCase().includes(value.toLowerCase()));
    setInputValue(value);
    setDisplayOptions(newOptions);
    setVisible(true);
  };

  return (
    <div ref={wrapperRef} className={`fn-select ${classNames}`}>
      <div
        className={`menu-toggle ${visible && 'active-box'}`}
        onClick={onShow}>
        {!isMulti ? <div className='input-select'>{itemSelected.label}</div> :
          <input className='input-select' value={inputValue} onChange={onChangeSearch} />
        }
      </div>
      <div className={`menu-dropdown ${position} ${visible && 'menu-open'}`}>
        {displayOptions?.length
          ? displayOptions?.map((option) => (
            <div
              onClick={onSelectItem(option)}
              className='select-item' key={option.value}>
              {/* {option?.value === itemSelected.value ? <Check /> : <Uncheck />} */}
              {renderLabel?.(option) || option.label}
            </div>
          ))
          : <div className='select-item'>No results</div>
        }
      </div>
    </div>
  );
};

export default Select;
