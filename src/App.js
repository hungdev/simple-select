import React from 'react';
import Select from './Select';

const opsData = Array(30).fill(0).map((_, i) => ({
  label: `Option ${i + 1}`,
  value: i + 1
}));
export default function App() {
  return (
    <div className='app-container'>
      <div>This is Simple select</div>
      <Select
        options={opsData}
        // isMulti
        renderLabel={(item) => <div>hello {item.label}</div>}
      />
    </div>
  );
}
