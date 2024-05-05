import { useState, useEffect } from 'react';
import Image from 'next/image';
import CustomizerContainer from './common/CustomizerContainer';
import InkIdInput from './common/InkIdInput';
import { generatorAssetsConfig } from '../../config/assets';

const Generator = ({ inkId, setInkId, onSelectedOptionChange }) => {
  const [selectedOption, setSelectedOption] = useState('');  // Set default selection
  const [imageSrc, setImageSrc] = useState('');
  const [optionImageSrc, setOptionImageSrc] = useState('');

  useEffect(() => {
    // Ensure the default selection is communicated outward
    onSelectedOptionChange('');
    // Optionally load image based on default selection
    setOptionImageSrc(`/assets/generator-assets/GM.svg`);
  }, [onSelectedOptionChange]);

  useEffect(() => {
    if (inkId.match(/^\d+$/)) {
      setImageSrc(`/assets/inks/${inkId}.webp`);
    } else {
      setImageSrc('');  // Clear the image if ID is not valid
    }
  }, [inkId]);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    onSelectedOptionChange(option);
    setOptionImageSrc(`/assets/generator-assets/${option}.svg`);
  };

  return (
    <CustomizerContainer pageIndex={1} setPageIndex={() => {}} totalPages={1}>
      <div className="flex flex-col items-center justify-center">
          <InkIdInput inkId={inkId} setInkId={setInkId} />
          <div className='options-container flex flex-wrap justify-center items-center mt-4' style={{ maxWidth: '220px', flexDirection: 'column' }}>
              {generatorAssetsConfig.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleOptionSelect(item.svg)}
                    style={{
                      width: '100px',
                      height: '100px',
                      display: 'inline-flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      border: selectedOption === item.svg ? '2px solid rgba(253, 134, 3, 1)' : 'none'  // Apply the border when selected
                    }}
                  >
                    <Image src={`/assets/generator-assets/${item.svg}`} alt={item.name} width={100} height={100} layout="fixed" />
                  </button>
              ))}
          </div>
      </div>
    </CustomizerContainer>
  );
};

export default Generator;
