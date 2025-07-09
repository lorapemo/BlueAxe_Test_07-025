
import CardHolder from './components/CardHolder';
import Container from './components/Container';
import Title from "./components/Title"
import HelpModal from './components/Helper';

import './App.css';

import { useScreenWidth } from './hooks/useScreenWidth';

function App() {
  useScreenWidth();
  return (
    <div className="App pokeball-border">
      <Title/>
      <Container children={<CardHolder/>}/>
      <HelpModal></HelpModal>
    </div>
  );
}

export default App;
