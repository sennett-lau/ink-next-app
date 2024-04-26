type Props = {
  tabs: string[]
  selectedTab: number
  setSelectedTab: (selectedTab: number) => void
}

const CanvasTab = (props: Props) => {
  return (
    <div className='mb-4 flex gap-4'>
      {props.tabs.map((tab, index) => (
        <button
          key={index}
          className={`text-black font-bold ${props.selectedTab === index ? 'border-b-2 border-primary-500 text-primary-500' : ''}`}
          onClick={() => props.setSelectedTab(index)}
        >
          {tab}
        </button>
      ))}
    </div>
  )
}

export default CanvasTab
