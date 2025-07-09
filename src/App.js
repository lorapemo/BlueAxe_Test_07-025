
import CardHolder from './components/CardHolder';
import SimpleBorderContainer from './components/Container';
import title from "./images/title.png"
import './App.css';
import HelpModal from './components/Helper';

function App() {
  return (
    <div className="App pokeball-border">
      <img src={title} className='Title'/>
      <SimpleBorderContainer children={<CardHolder/>}></SimpleBorderContainer>
      <HelpModal></HelpModal>
    </div>
  );
}

export default App;
